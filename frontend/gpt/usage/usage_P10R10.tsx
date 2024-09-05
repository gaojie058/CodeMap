// src/gpt/usage_inheritanceFlowExplanation.tsx

import React, { useState } from 'react';
import { GptComponent } from '../GptComponent';

const InheritanceFlowExplanation: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 触发重新渲染 GptComponent
  };

  return (
    <div>
      <h1>Inheritance Flow Explanation</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={selectedNode} 
          onChange={(e) => setSelectedNode(e.target.value)}
          placeholder="Enter the selected component name"
        />
        <button type="submit">Generate Explanation</button>
      </form>
      <GptComponent 
        queryType="inheritanceFlowExplanation" 
        params={{ selectedNode }} 
      />
    </div>
  );
};

export default InheritanceFlowExplanation;