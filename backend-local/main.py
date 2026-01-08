import os
import uvicorn
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

# Import your existing services
from services.stt_service import stt_instance
from services.llm_service import get_llm_response
from services.tts_service import tts_service 
from utils.audio_tools import cleanup_temp_files

app = FastAPI()

# 1. 📂 SETUP STORAGE
TEMP_DIR = "temp_audio"
os.makedirs(TEMP_DIR, exist_ok=True)

# 2. 🛡️ CORS: Allow React to connect
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

# 3. 🔊 MOUNT STATIC FOLDER: This allows GET requests to /temp_audio/filename.wav
app.mount("/temp_audio", StaticFiles(directory=TEMP_DIR), name="temp_audio")

@app.post("/voice/process")
async def process_voice_local(file: UploadFile = File(...)):
    try:
        audio_bytes = await file.read()
        
        # 🎙️ Step 1: Transcription
        user_text, files_to_clean = stt_instance.transcribe(audio_bytes)
        
        if not user_text:
            cleanup_temp_files(files_to_clean)
            return {"text": "", "response": "I couldn't hear you."}

        # 🤖 Step 2: LLM Response
        ai_text = get_llm_response(user_text)

        # 🔊 Step 3: Speech Generation (Kokoro)
        audio_path = tts_service.generate_audio(ai_text)
        
        # 🔗 Step 4: Create the Clean URL
        # Path: http://localhost:8000/temp_audio/filename.wav
        filename = os.path.basename(audio_path)
        audio_url = f"http://localhost:8000/temp_audio/{filename}"
        
        cleanup_temp_files(files_to_clean)

        return {
            "text": user_text,
            "response": ai_text,
            "audio_url": audio_url
        }

    except Exception as e:
        print(f"🚨 Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)