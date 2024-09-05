import React from 'react';
import { GptComponent } from '../GptComponent';

const ProjectStructureJson: React.FC = () => {
  return (
    <div>
      <h1>Project Structure Analysis (JSON)</h1>
      <p>This will generate a comprehensive JSON analysis of the project structure and module relationships.</p>
      <GptComponent 
        queryType="projectStructureJson" 
        params={{}} 
      />
    </div>
  );
};

export default ProjectStructureJson;