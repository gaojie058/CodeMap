import React, { useState } from 'react';
import { GptComponent } from '../GptComponent';

const App: React.FC = () => {
  const [fileOrComponent, setFileOrComponent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger a re-render of GptComponent
  };

  return (
    <div>
      <h1>Function Call Flow (DOT)</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={fileOrComponent} 
          onChange={(e) => setFileOrComponent(e.target.value)}
          placeholder="Enter file or component name"
        />
        <button type="submit">Generate Flow</button>
      </form>
      <GptComponent 
        queryType="functionCallFlowDot" 
        params={{ fileOrComponent }} 
      />
    </div>
  );
};

export default App;