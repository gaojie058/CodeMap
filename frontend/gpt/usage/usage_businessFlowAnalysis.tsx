import React, { useState } from 'react';
import { GptComponent } from '../GptComponent';

const App: React.FC = () => {
  const [highlightedBusinessFlow, setHighlightedBusinessFlow] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 触发重新渲染 GptComponent
  };

  return (
    <div>
      <h1>Business Flow Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={highlightedBusinessFlow} 
          onChange={(e) => setHighlightedBusinessFlow(e.target.value)}
          placeholder="Describe the highlighted business flow"
        />
        <button type="submit">Analyze</button>
      </form>
      <GptComponent 
        queryType="businessFlowAnalysis" 
        params={{ highlightedBusinessFlow }} 
      />
    </div>
  );
};

export default App;