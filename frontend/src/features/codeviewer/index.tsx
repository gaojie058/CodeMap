import React from 'react';
import Editor from '@monaco-editor/react';

/**
 * Renders the "Code Browser" section of the application.
 * Serves as the default landing page after user uploads a source code folder,
 * displaying a read-only view of the code structure and files.
 */
const CodeViewer: React.FC = () => {
  return (
    <Editor
      height='90vh'
      defaultLanguage='javascript'
      defaultValue='// some comment'
      options={{domReadOnly: true}}
    />
  );
};

export default CodeViewer;
