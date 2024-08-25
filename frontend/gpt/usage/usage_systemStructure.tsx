import React, { useState } from 'react';
import { GptComponent } from '../GptComponent';
import { QueryType } from '../queryDefinitions';

const App: React.FC = () => {
  const [queryType, setQueryType] = useState<QueryType>('projectAnalysis');
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加额外的逻辑，比如验证输入等
  };

  return (
    <div>
      <h1>Project Analysis</h1>
      <form onSubmit={handleSubmit}>
        <select value={queryType} onChange={(e) => setQueryType(e.target.value as QueryType)}>
          <option value="projectAnalysis">Project Analysis</option>
          <option value="codeReview">Code Review</option>
          <option value="bugAnalysis">Bug Analysis</option>
        </select>
        <input 
          type="text" 
          value={projectName} 
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />
        <button type="submit">Analyze</button>
      </form>
      <GptComponent queryType={queryType} params={{ projectName }} />
    </div>
  );
};

export default App;