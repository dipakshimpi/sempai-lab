import os
import librosa
import soundfile as sf

def prepare_audio_for_whisper(input_path):
    """Converts raw web audio to 16kHz Mono WAV for high-accuracy Whisper STT."""
    try:
        # Load any audio format and force it to 16,000Hz
        audio, sr = librosa.load(input_path, sr=16000)
        
        # Define the cleaned filename
        output_path = input_path.rsplit(".", 1)[0] + "_processed.wav"
        
        # Save as a standard WAV file
        sf.write(output_path, audio, 16000)
        return output_path
    except Exception as e:
        print(f"❌ Audio Processing Error: {e}")
        return None

def cleanup_temp_files(file_list):
    """Removes temporary files to keep your storage clean."""
    for file_path in file_list:
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"⚠️ Cleanup failed for {file_path}: {e}")