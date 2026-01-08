import React, { useState } from 'react';
import { useRecorder } from './hooks/useRecorder';
import { useHybridVoice } from './hooks/useHybridVoice';

function App() {
    const [engine, setEngine] = useState('cloud'); 
    const [localTranscript, setLocalTranscript] = useState("");
    const [localAiResponse, setLocalAiResponse] = useState("");

    // Cloud Engine Hook (Port 5000)
    const { processVoice, transcript, aiResponse, isLoading: cloudLoading } = useHybridVoice();

    const handleAudioProcess = async (blob) => {
        if (engine === 'cloud') {
            await processVoice(blob);
        } else {
            processLocalVoice(blob);
        }
    };

    // Local Engine Logic (Port 8000)
    const processLocalVoice = async (audioBlob) => {
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        try {
            const response = await fetch("http://localhost:8000/voice/process", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setLocalTranscript(data.text);
            setLocalAiResponse(data.response);

            if (data.audio_url) {
                const audio = new Audio(data.audio_url);
                audio.play().catch(e => console.error("Audio Blocked:", e));
            }
        } catch (error) {
            console.error("Local Connection Error:", error);
        }
    };

    const { isRecording, startRecording, stopRecording } = useRecorder(handleAudioProcess);

    // Pick which text to show based on the toggle
    const currentTranscript = engine === 'cloud' ? transcript : localTranscript;
    const currentAI = engine === 'cloud' ? aiResponse : localAiResponse;

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>AI Voice Assistant</h1>
            
            <select value={engine} onChange={(e) => setEngine(e.target.value)} style={{ padding: '10px', marginBottom: '20px' }}>
                <option value="cloud">Cloud (ElevenLabs)</option>
                <option value="local">Local (Kokoro)</option>
            </select>

            <br />

            <button 
                onClick={isRecording ? stopRecording : startRecording}
                style={{
                    padding: '20px 40px', fontSize: '20px', borderRadius: '50px',
                    backgroundColor: isRecording ? 'red' : 'green', color: 'white'
                }}
            >
                {isRecording ? "🛑 STOP" : "🎤 SPEAK"}
            </button>

            <div style={{ marginTop: '30px' }}>
                <p><strong>You:</strong> {currentTranscript}</p>
                <p><strong>AI:</strong> {currentAI}</p>
            </div>
        </div>
    );
}

export default App;