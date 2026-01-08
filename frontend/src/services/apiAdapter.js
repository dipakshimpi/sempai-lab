// This file ensures that no matter which backend we use, 
// the rest of the app gets the same data structure.

export const sendToCloud = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    
    const response = await fetch("http://localhost:5000/voice", {
        method: "POST",
        body: formData
    });
    return await response.json(); // Expected: { text, audio_base64 }
};

export const sendToLocal = (audioBlob, onMessage) => {
    // Local uses WebSockets for speed with Kokoro
    const socket = new WebSocket("ws://localhost:8000/ws");
    
    socket.onopen = () => {
        socket.send(audioBlob);
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data); // Expected: { text, audio_url }
    };
};