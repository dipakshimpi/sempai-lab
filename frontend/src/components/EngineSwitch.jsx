import React from 'react';

const EngineSwitch = ({ engine, setEngine }) => {
  return (
    <div className="engine-switch">
      <label htmlFor="ai-engine">AI Voice Engine: </label>
      <select 
        id="ai-engine" 
        value={engine} 
        onChange={(e) => setEngine(e.target.value)}
      >
        <option value="cloud">Cloud (ElevenLabs + Groq)</option>
        <option value="local">Local (Kokoro + Python)</option>
      </select>
    </div>
  );
};

export default EngineSwitch;