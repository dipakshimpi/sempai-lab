import React from 'react';

const Recorder = ({ isRecording, startRecording, stopRecording, isLoading }) => {
  return (
    <div className="recorder-section">
      <button 
        className={`mic-button ${isRecording ? 'recording' : ''}`} 
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isLoading}
      >
        {isLoading ? "⏳" : "🎤"}
      </button>
      <p className="status-text">
        {isLoading ? "AI is thinking..." : isRecording ? "Listening..." : "Click to Speak"}
      </p>
    </div>
  );
};

export default Recorder;