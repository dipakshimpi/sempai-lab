import { useState, useRef } from 'react';

export const useHybridVoice = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const audioRef = useRef(null);

    const processVoice = async (audioBlob) => {
        setIsLoading(true);
        console.log("📤 Sending audio to backend..."); // Debug Log
        
        try {
            const formData = new FormData();
            formData.append("file", audioBlob, "recording.webm");

            // 🎯 DIRECT TARGET: No variables, just the working path
            const response = await fetch("http://localhost:5000/voice", {
                method: "POST",
                body: formData, 
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const data = await response.json();
            console.log("📥 Backend responded:", data); // Debug Log

            setTranscript(data.transcript);
            setAiResponse(data.aiMessage);

            if (data.audioUrl) {
                const audio = new Audio(`${data.audioUrl}?t=${Date.now()}`);
                audio.crossOrigin = "anonymous";
                audioRef.current = audio;

                audio.play().catch(() => {
                    console.log("🔇 Click page to unlock audio");
                    window.addEventListener('click', () => audio.play(), { once: true });
                });
            }
        } catch (error) {
            console.error("❌ Frontend Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { processVoice, isLoading, transcript, aiResponse };
};