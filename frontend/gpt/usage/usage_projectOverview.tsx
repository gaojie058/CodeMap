import React from 'react';
import { GptComponent } from '../GptComponent';

const App: React.FC = () => {
  return (
    <div>
      <h1>Project Overview</h1>
      <GptComponent queryType="projectOverview" />
    </div>
  );
};

export default App;