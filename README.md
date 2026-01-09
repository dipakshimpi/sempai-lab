🎙️ OmniVoice Hybrid AI

Intelligent Voice Assistant with Dual-Engine Processing
OmniVoice is a high-performance, hybrid AI assistant that bridges the gap between Cloud-based intelligence and Local privacy. It allows users to toggle seamlessly between hyper-realistic cloud voices and completely private local execution.


🌟 Features
    🔄 Hybrid Execution Engine
    Cloud Mode: Ultra-fast processing using Groq (Whisper-v3) for speech and ElevenLabs for hyper-realistic multilingual voices.

Local Mode: 100% private, offline-capable processing using Faster-Whisper and Kokoro-82M.

🌍 Multilingual Support
    English: Full support on both Cloud and Local engines.

    Hindi & Marathi: Optimized via ElevenLabs Multilingual v2 for perfect phonetics and natural accents.

🔊 Dynamic Asset Pipeline
    Shared Audio Storage: Generated AI voices are saved directly to frontend/public/audio/ for low-latency playback.

    Smart Switching: The system automatically selects the best model based on the user's language choice.

🏗️ Architecture

┌──────────────────┐           ┌──────────────────┐
       │   React (Vite)   │──────────▶│  Node.js Backend │ (Cloud)
       │    (Frontend)    │◀──────────│   (Port 5000)    │
       └────────┬─────────┘           └──────────────────┘
                │                               │
          Choice Output                  Write Audio to
          (Local/Cloud)               /frontend/public/audio
                │                               ▲
                ▼                               │
       ┌──────────────────┐           ┌─────────┴────────┐
       │  FastAPI Python  │──────────▶│  Local AI Models │ (Local)
       │    (Port 8000)   │◀──────────│ (Whisper/Kokoro) │
       └──────────────────┘           └──────────────────┘


📂 Project Structure

OmniVoice-Hybrid/
├── ⚛️ frontend/                # React UI
│   ├── 📁 public/audio/         # Shared storage for AI voice output
│   ├── 📁 src/hooks/            # useRecorder & useHybridVoice logic
│   └── 📄 App.jsx               # Main UI Dashboard
│
├── ☁️ backend-cloud/           # Node.js + ElevenLabs (Cloud Engine)
│   ├── 📁 src/services/         # Groq & ElevenLabs integrations
│   └── 📄 server.js             # Entry point (Port 5000)
│
└── 🐍 backend-local/           # Python + Kokoro (Local Engine)
    ├── 📁 services/             # Local STT & TTS logic
    ├── 📁 temp_audio/           # Buffer for incoming recordings
    └── 📄 main.py               # FastAPI entry point (Port 8000)


🚀 Getting Started


Prerequisites
   
    Node.js (v18+)
    Python (3.10+)
    API Keys: ElevenLabs & Groq


Installation

1. Clone the Repository

    git clone https://github.com/dipakshimpi/sempai-lab.git
    cd sempai-lab

2. Setup Local Backend (Python)

    cd backend-local
    python -m venv .venv
    .\.venv\Scripts\activate  # Windows
    pip install -r requirements.txt
    python main.py

3. Setup Cloud Backend (Node.js)

    cd backend-cloud
    npm install
    # Create .env with ELEVENLABS_API_KEY and GROQ_API_KEY
    npm start

4. Setup Frontend (React)

    cd frontend
    npm install
    npm run dev


## ⚙️ Configuration

| Variable | Description | Value / Default |
| :--- | :--- | :--- |
| **ELEVENLABS_API_KEY** | API Key for high-fidelity TTS (Multilingual v2) | Required (Cloud) |
| **GROQ_API_KEY** | API Key for ultra-fast Llama-3 and Whisper-v3 | Required (Hybrid) |
| **PORT_CLOUD** | Node.js backend server port | 5000 |
| **PORT_LOCAL** | Python/FastAPI backend server port | 8000 |


⚠️ Troubleshooting
   
    CORS Errors: Ensure both backends have CORS enabled for the frontend origin (http://localhost:5173).

    FFmpeg Not Found: Ensure FFmpeg is installed and added to your System Path for audio processing.

    Microphone Access: Browsers require localhost or HTTPS to allow microphone usage


🛠️ Tech Stack
    Frontend: React, Vite, Axios

    Cloud Backend: Node.js, Express, ElevenLabs SDK, Groq SDK

    Local Backend: Python, FastAPI, Faster-Whisper, Kokoro-ONNX

    Styling: Tailwind CSS / CSS3


👤 Author
    Dipak Shimpi Aspiring AI Developer & Software Architect