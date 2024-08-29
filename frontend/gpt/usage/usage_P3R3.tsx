// src/gpt/usage_businessComponentFlow.tsx

import React, { useState } from 'react';
import { GptComponent } from '../GptComponent';

const BusinessComponentFlow: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 触发重新渲染 GptComponent
  };

  return (
    <div>
      <h1>Business Component Flow</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={selectedNode} 
          onChange={(e) => setSelectedNode(e.target.value)}
          placeholder="Enter the selected business component name"
        />
        <button type="submit">Generate Flow</button>
      </form>
      <GptComponent 
        queryType="businessComponentFlow" 
        params={{ selectedNode }} 
      />
    </div>
  );
};

export default BusinessComponentFlow;