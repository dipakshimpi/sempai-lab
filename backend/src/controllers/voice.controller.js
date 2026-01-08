import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { speechToText } from "../services/stt.service.js";
import { generateResponse } from "../services/llm.service.js";
import { textToSpeech } from "../services/tts.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const handleVoice = async (req, res) => {
  const audioPath = req.file?.path;

  try {
    if (!audioPath) return res.status(400).json({ error: "No audio file uploaded" });

    // 1. Convert Voice to Text
    console.log("🎙️ STT: Processing...");
    const transcript = await speechToText(audioPath);
    console.log("📝 User:", transcript);

    // 2. Get AI Answer
    const aiMessage = await generateResponse(transcript);
    console.log("🧠 AI:", aiMessage);

    // 3. Convert Answer to Speech (Buffer)
    const audioBuffer = await textToSpeech(aiMessage);

    // 4. Save to Public Folder
    const fileName = `voice-${Date.now()}.mp3`;
    const publicAudioDir = path.join(__dirname, "../../public/audio");
    
    if (!fs.existsSync(publicAudioDir)) {
      fs.mkdirSync(publicAudioDir, { recursive: true });
    }

    const fullFilePath = path.join(publicAudioDir, fileName);
    fs.writeFileSync(fullFilePath, audioBuffer);
    console.log("✅ Audio saved to:", fileName);

    // 5. Cleanup temp upload & Send URL
    if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);

    res.json({
      transcript,
      aiMessage,
      audioUrl: `http://localhost:5000/audio/${fileName}` 
    });

  } catch (error) {
    console.error("🚨 Pipeline Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};