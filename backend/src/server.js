import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔍 DEBUG: Helps you see exactly where the server is looking for the route file
console.log("🚀 Attempting to load route from:", path.join(__dirname, 'routes/voice.route.js'));

// ✅ Import the routes (Ensures it matches your file name voice.route.js)
import voiceRoutes from './routes/voice.route.js';

const app = express();

app.use(cors());
app.use(express.json());

// 📁 Define and Verify the Public Audio Path (Root/public/audio)
const publicAudioPath = path.resolve(__dirname, '../public/audio');
if (!fs.existsSync(publicAudioPath)) {
    fs.mkdirSync(publicAudioPath, { recursive: true });
    console.log("📁 Created Directory:", publicAudioPath);
}

// ✅ Serve the audio folder so the AI voice can be accessed via URL
app.use('/audio', express.static(publicAudioPath));

// Routes
app.use('/voice', voiceRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
    console.log(`🔊 Static audio files served from: ${publicAudioPath}`);
});