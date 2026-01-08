import Groq from "groq-sdk";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// ✅ Ensure the key is loaded or throw a clear error
const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("❌ ERROR: GROQ_API_KEY is not defined in your .env file!");
}

const groq = new Groq({
  apiKey: apiKey,
});

export const speechToText = async (audioPath) => {
  try {
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-large-v3",
      response_format: "text",
    });

    return transcription;
  } catch (error) {
    console.error("❌ STT Error Details:", error.message);
    throw error;
  }
};