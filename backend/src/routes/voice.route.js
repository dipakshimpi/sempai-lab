import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { handleVoice } from "../controllers/voice.controller.js";

const router = express.Router();

// Setup paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, "../../uploads");

// Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Storage configuration to ensure proper file extensions
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Create a unique name ending in .webm so Groq can read it
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webm`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// ✅ The field name "file" must match what you send from React
router.post("/", upload.single("file"), handleVoice);

export default router;