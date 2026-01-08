import os
import uuid
import soundfile as sf
from kokoro_onnx import Kokoro

class TTSService:
    def __init__(self):
        # Dynamically find the models folder relative to this file
        self.base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.model_path = os.path.join(self.base_path, "models", "kokoro", "kokoro-v0_19.onnx")
        self.voices_path = os.path.join(self.base_path, "models", "kokoro", "voices.bin")
        
        if not os.path.exists(self.model_path):
            print(f"❌ Kokoro Model not found at: {self.model_path}")
            self.kokoro = None
        else:
            try:
                self.kokoro = Kokoro(self.model_path, self.voices_path)
                print("✅ Kokoro TTS Service Initialized (af_sky)")
            except Exception as e:
                print(f"❌ Kokoro Init Error: {e}")
                self.kokoro = None

    def generate_audio(self, text: str):
        if not self.kokoro or not text.strip():
            return None
        try:
            temp_dir = os.path.join(self.base_path, "temp_audio")
            os.makedirs(temp_dir, exist_ok=True)
            filename = f"reply_{uuid.uuid4().hex[:8]}.wav"
            output_path = os.path.join(temp_dir, filename)
            
            samples, sample_rate = self.kokoro.create(text, voice="af_sky", speed=1.0, lang="en-us")
            sf.write(output_path, samples, sample_rate)
            return output_path
        except Exception as e:
            print(f"❌ TTS Generation Error: {e}")
            return None

# CRITICAL: This line creates the 'tts_service' object that main.py is looking for
tts_service = TTSService()