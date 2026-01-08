import React from 'react';

const DisplayChat = ({ transcript, aiResponse }) => {
  if (!transcript && !aiResponse) return null;

  return (
    <div className="chat-display">
      <div className="chat-bubble user-bubble">
        <strong>You:</strong> {transcript || "..."}
      </div>
      {aiResponse && (
        <div className="chat-bubble ai-bubble">
          <strong>AI:</strong> {aiResponse}
        </div>
      )}
    </div>
  );
};

export default DisplayChat;