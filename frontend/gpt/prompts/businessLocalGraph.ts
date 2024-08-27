export const businessLocalGraphPrompt = {
  name: 'businessLocalGraph',
  content: `Can you generate a local map under this business component? 

  {selectedNode}
  
1. using dot language
2. annotate the purpose of each edge
3. output important functions, variables, and file path
`,
};
