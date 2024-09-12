import React, { useState } from 'react';
import { GptComponent } from '../GptComponent';

const BusinessFlowAnalysis: React.FC = () => {
  const [highlightedBusinessFlow, setHighlightedBusinessFlow] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger a re-render of GptComponent
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

export default BusinessFlowAnalysis;