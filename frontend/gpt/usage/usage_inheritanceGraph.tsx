import React from 'react';
import { GptComponent } from '../GptComponent';

const App: React.FC = () => {
  return (
    <div>
      <h1>Inheritance Graph</h1>
      <GptComponent queryType="inheritanceGraph" />
    </div>
  );
};

export default App;