import React, { useState } from 'react';
import { GptComponent } from '../GptComponent';

const App: React.FC = () => {
  const [inheritanceRelation, setInheritanceRelation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger a re-render of GptComponent
  };

  return (
    <div>
      <h1>Inheritance Relation Explanation</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={inheritanceRelation} 
          onChange={(e) => setInheritanceRelation(e.target.value)}
          placeholder="Enter the inheritance relation to explain"
        />
        <button type="submit">Explain</button>
      </form>
      <GptComponent 
        queryType="inheritanceRelationExplanation" 
        params={{ inheritanceRelation }} 
      />
    </div>
  );
};

export default App;