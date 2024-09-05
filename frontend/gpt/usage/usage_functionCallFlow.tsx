import React, { useState } from 'react';
import { GptComponent } from '../GptComponent';

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 触发重新渲染 GptComponent
  };

  return (
    <div>
      <h1>Function Call Flow</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={selectedNode} 
          onChange={(e) => setSelectedNode(e.target.value)}
          placeholder="Enter the selected node name"
        />
        <button type="submit">Generate Flow</button>
      </form>
      <GptComponent 
        queryType="functionCallFlow" 
        params={{ selectedNode }} 
      />
    </div>
  );
};

export default App;