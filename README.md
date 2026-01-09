<div align="left">

<h1>🎙️ OmniVoice</h1>
<h3>Hybrid Voice AI Engine — Cloud Power × Local Privacy</h3>

<p>
Talk to AI. Choose where your intelligence runs.
<br>
<b>Cloud-grade voices. Local-first privacy. One seamless experience.</b>
</p>

<hr>

<h2>🚀 What is OmniVoice?</h2>

<p>
OmniVoice is a <b>hybrid voice AI platform</b> that allows users to speak naturally with artificial intelligence while dynamically choosing where the intelligence runs — either in the <b>cloud</b> or <b>locally on their own machine</b>.
</p>

<p>
Unlike traditional voice assistants that force all data into the cloud, OmniVoice gives users full control:
</p>

<ul>
  <li>☁️ Cloud AI for premium voices and maximum intelligence</li>
  <li>🖥️ Local AI for privacy, speed, and offline capability</li>
</ul>

<p>
The frontend remains identical — only the AI brain changes.
</p>

<hr>

<h2>🧠 Why OmniVoice is Different</h2>

<table>
<tr><th>Cloud-Only AI</th><th>Local-Only AI</th><th>OmniVoice</th></tr>
<tr><td>High quality</td><td>Private</td><td><b>Both</b></td></tr>
<tr><td>Scalable</td><td>Offline</td><td><b>Hybrid</b></td></tr>
<tr><td>Expensive</td><td>Limited</td><td><b>Flexible</b></td></tr>
<tr><td>Data leaves device</td><td>Data stays local</td><td><b>User decides</b></td></tr>
</table>

<hr>

<h2>⚡ Core Features</h2>

<h3>🔄 Dual AI Engine</h3>

<p><b>Cloud Mode</b></p>
<ul>
  <li>Speech-to-Text: ElevenLabs</li>
  <li>LLM: Groq LLaMA</li>
  <li>Text-to-Speech: ElevenLabs Multilingual</li>
</ul>

<p><b>Local Mode</b></p>
<ul>
  <li>Speech-to-Text: Faster-Whisper</li>
  <li>LLM: Groq LLaMA</li>
  <li>Text-to-Speech: Kokoro-82M (ONNX)</li>
</ul>

<p>
Both engines return:
</p>

<ul>
  <li>Transcript</li>
  <li>AI response</li>
  <li>Spoken voice</li>
</ul>

<hr>

<h3>🎙️ Voice-First Interface</h3>
<ul>
  <li>Browser-based microphone recording</li>
  <li>Automatic speech recognition</li>
  <li>Real-time AI replies</li>
  <li>High-quality AI voice playback</li>
</ul>

<hr>

<h3>🔊 Unified Audio Pipeline</h3>

<p>
All generated voices are written to:
</p>

<pre>frontend/public/audio/</pre>

<p>
This ensures:
</p>

<ul>
  <li>Instant playback</li>
  <li>No streaming delays</li>
  <li>Same UI for Cloud and Local</li>
</ul>

<hr>

<h2>🧬 System Architecture</h2>

<pre>
User speaks
   ↓
React (Vite) UI
   ↓
Engine Switch (Cloud / Local)
   ↓
useHybridVoice.js
   ↓
-----------------------------
|                           |
Cloud AI                Local AI
(Node.js)               (FastAPI)
Port 5000               Port 8000
|                           |
ElevenLabs STT       Faster-Whisper
|                           |
Groq LLaMA           Groq LLaMA
|                           |
ElevenLabs TTS       Kokoro-82M
        ↓
frontend/public/audio
        ↓
Browser plays the AI voice
</pre>

<hr>

<h2>📂 Project Structure</h2>

<pre>
sempai-lab/
|
|-- frontend/
|   |-- public/audio/
|   |-- src/
|       |-- components/
|       |-- hooks/
|       |-- services/
|
|-- backend-cloud/
|   |-- services/
|   |-- routes/
|   |-- app.js   (Port 5000)
|
|-- backend-local/
|   |-- services/
|   |-- public/audio/
|   |-- main.py  (Port 8000)
|
|-- README.md
</pre>

<hr>

<h2>⚙️ Getting Started</h2>

<h3>1. Clone</h3>
<pre>git clone https://github.com/dipakshimpi/sempai-lab.git
cd sempai-lab</pre>

<h3>2. Local AI Engine</h3>
<pre>
cd backend-local
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
</pre>

<p>Create <b>.env</b></p>
<pre>GROQ_API_KEY=your_groq_key</pre>

<pre>python main.py</pre>

<p>Runs on http://localhost:8000</p>

<h3>3. Cloud AI Engine</h3>
<pre>
cd backend-cloud
npm install
</pre>

<p>Create <b>.env</b></p>
<pre>
ELEVENLABS_API_KEY=your_key
GROQ_API_KEY=your_key
</pre>

<pre>npm start</pre>

<p>Runs on http://localhost:5000</p>

<h3>4. Frontend</h3>
<pre>
cd frontend
npm install
npm run dev
</pre>

<p>Open http://localhost:5173</p>

<hr>

<h2>🧑‍💻 Author</h2>

<p>
<b>Dipak Shimpi</b><br>
AI Engineer & System Architect<br>
Building hybrid intelligence systems.
</p>

</div>
