import React, { useState } from 'react';
import { GptComponent } from '../GptComponent';

const App: React.FC = () => {
  const [relatedComponent, setRelatedComponent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger a re-render of GptComponent
  };

  return (
    <div>
      <h1>Component Relation Analysis</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={relatedComponent} 
          onChange={(e) => setRelatedComponent(e.target.value)}
          placeholder="Enter the component name"
        />
        <button type="submit">Analyze</button>
      </form>
      <GptComponent 
        queryType="componentRelationAnalysis" 
        params={{ relatedComponent }} 
      />
    </div>
  );
};

export default App;