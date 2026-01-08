
# 🎙️ OmniVoice Hybrid AI Assistant

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Python](https://img.shields.io/badge/Local_Brain-Python-yellow)
![Node](https://img.shields.io/badge/Cloud_Brain-Node.js-green)

A high-performance **Hybrid Voice Assistant** that bridges the gap between Cloud-based intelligence and Local privacy. Toggle seamlessly between hyper-realistic cloud voices and completely private local execution.



---

## 📖 Table of Contents
1. [Project Overview](#-project-overview)
2. [Technology Stack](#-technology-stack)
3. [Folder Structure](#-folder-structure)
4. [Installation & Setup](#-installation--setup)
5. [How to Clone & Run](#-how-to-clone--run)
6. [Key Learning Milestones](#-key-learning-milestones)

---

## 🌟 Project Overview
This project is designed for users who want the best of both worlds. 
* **Cloud Mode:** High quality, using ElevenLabs and Groq.
* **Local Mode:** Privacy-focused, using Whisper and Kokoro (FastAPI).

---

## 🛠️ Technology Stack

| Component | Cloud Engine (Node.js) | Local Engine (Python) |
| :--- | :--- | :--- |
| **STT (Speech-to-Text)** | Groq (Whisper-v3) | Faster-Whisper |
| **LLM (Logic)** | Llama 3 (Groq API) | Custom Python Logic |
| **TTS (Text-to-Speech)** | ElevenLabs | Kokoro-82M (ONNX) |
| **Port** | 5000 | 8000 |

## 📂 Project Directory Structure

```text
OmniVoice-Hybrid/
├── 📄 .gitignore                # Root ignore file (Stops heavy files)
├── 📄 README.md                 # Project Documentation
│
├── ⚛️ frontend/                 # React Frontend (Vite)
│   ├── 📁 public/               # Static Assets
│   ├── 📁 src/                  # Source Code
│   │   ├── 📁 hooks/            # Custom Logic (Audio/API)
│   │   │   ├── useRecorder.js   # Microphone Management
│   │   │   └── useHybridVoice.js# Switching Logic
│   │   ├── App.jsx              # Main UI Interface
│   │   └── main.jsx             # Entry Point
│   ├── 📄 package.json          # Frontend Dependencies
│   └── 📄 vite.config.js        # Vite Configuration
│
├── ☁️ backend/                  # Node.js Cloud Server (Port 5000)
│   ├── 📁 src/
│   │   ├── 📁 services/         # ElevenLabs & Groq Integration
│   │   └── server.js            # Express Server Entry
│   ├── 📄 .env                  # API Keys (PRIVATE)
│   └── 📄 package.json          # Backend Dependencies
│
└── 🐍 backend-local/            # Python Local Server (Port 8000)
    ├── 📁 services/             # Whisper & Kokoro Logic
    ├── 📁 temp_audio/           # Temporary Audio Storage
    ├── 📁 models/               # AI Models (Manual Setup Required)
    ├── 📄 main.py               # FastAPI Server Entry
    └── 📄 requirements.txt      # Python Dependencies List



---

## 📥 How to Clone & Run

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
Open your terminal and run:
```bash
git clone [https://github.com/dipakshimpi/sempai-lab.git](https://github.com/dipakshimpi/sempai-lab.git)
cd sempai-lab

2. Set Up the Backends
You will need two terminals open for the backends:

Terminal A (Local Python):

cd backend-local
python -m venv .venv
# Activate on Windows:
.\.venv\Scripts\activate
# Install and Run:
pip install -r requirements.txt
python main.py

Terminal B (Cloud Node):

cd backend
npm install
# Note: Create a .env file and add your API keys
npm start

3. Set Up the Frontend
Terminal C:

cd frontend
npm install
npm run dev

🛠️ How to Make Changes (Contribution)
If you want to modify the project, follow this "Best Practice" workflow:

git checkout -b feature/your-feature-name

Make your changes: (e.g., change the UI colors in App.jsx or the AI personality in main.py).

Commit your changes: git commit -m "Add: Descriptive message about your change"

Push to the branch: git push origin feature/your-feature-name

Open a Pull Request: Go to GitHub and click "Compare & pull request."


🛡️ Key Learning Milestones
Multi-Backend Routing: Successfully managed data flow between JavaScript and Python environments.

Binary Data Handling: Managed Blobs and FormData to send audio via HTTP.

CORS Configuration: Mastered cross-origin security between three different servers.



---

## ⚠️ Troubleshooting & Common Issues

While building or running this project, you might encounter specific technical hurdles. Here is how to resolve the most common ones:

### 1. 📂 Large File Push Error (GitHub 100MB Limit)
* **The Issue:** Git fails to push because the `.onnx` model files are too large.
* **The Solution:** We use a `.gitignore` to exclude the `models/` folder. Ensure your models are saved locally but never tracked by Git. If you accidentally tracked a large file, use `git rm --cached <file_path>` to remove it from the index.

### 2. 🎤 Microphone Access Denied
* **The Issue:** The browser won't record audio.
* **The Solution:** * Ensure the site is running on `localhost` or `HTTPS`. Browsers block microphone access on non-secure `HTTP` sites.
    * Check Browser Permissions (the little lock icon in the URL bar) and ensure "Microphone" is set to "Allow."

### 3. 🌐 CORS Errors (Cross-Origin Resource Sharing)
* **The Issue:** The Frontend (Port 5173) cannot talk to the Python Backend (Port 8000).
* **The Solution:** * In the FastAPI (`main.py`), ensure `CORSMiddleware` is configured to allow `allow_origins=["*"]`.
    * In Node.js, ensure the `cors()` middleware is used before any routes.

### 4. 🐍 Python Library Conflicts
* **The Issue:** Errors like `ModuleNotFoundError` or version mismatches.
* **The Solution:** **Always** use a Virtual Environment (`.venv`). This isolates your project dependencies from your global Python installation. Run `pip install -r requirements.txt` only after activating the environment.

### 5. 🔊 FFmpeg Not Found
* **The Issue:** Audio conversion fails in the backend.
* **The Solution:** This project requires **FFmpeg** installed on your OS. 
    * **Windows:** Download from ffmpeg.org and add the `/bin` folder to your System Environment Variables (Path).

---

## 🛠️ Debugging Tips
* **Frontend:** Open Chrome DevTools (`F12`) and check the **Console** for red errors.
* **Backend:** Watch the terminal logs; FastAPI and Node.js will print the exact line number where a crash occurs.
* **Network:** Use the "Network" tab in DevTools to see if the audio blob is actually being sent to the server.

👤 Author
Dipak Shimpi Aspiring AI Developer 