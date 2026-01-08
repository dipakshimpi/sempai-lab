import os
import whisper
from utils.audio_tools import prepare_audio_for_whisper

class STTService:
    def __init__(self):
        print("⏳ Loading Whisper STT Model...")
        self.model = whisper.load_model("base")
        print("✅ STT Ready")

    def transcribe(self, audio_bytes):
        # 1. Save the incoming bytes from WebSocket
        raw_path = "temp_audio/raw_mic.webm"
        with open(raw_path, "wb") as f:
            f.write(audio_bytes)
        
        # 2. Clean the audio using our tool
        processed_path = prepare_audio_for_whisper(raw_path)
        if not processed_path:
            return None, [raw_path]
        
        # 3. Transcribe with Whisper
        # fp16=False prevents errors on CPUs
        result = self.model.transcribe(processed_path, fp16=False)
        user_text = result.get("text", "").strip()
        
        # DEBUG: See what was heard
        print(f"👤 Whisper Heard: '{user_text}'")
        
        return user_text, [raw_path, processed_path]

stt_instance = STTService()