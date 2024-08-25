import React from 'react';
import { GptComponent } from '../GptComponent';

const App: React.FC = () => {
  return (
    <div>
      <h1>Project Analysis (JSON)</h1>
      <GptComponent queryType="projectAnalysisJson" />
      
      <h1>System Structure (DOT)</h1>
      <GptComponent queryType="systemStructureDot" />
    </div>
  );
};

export default App;