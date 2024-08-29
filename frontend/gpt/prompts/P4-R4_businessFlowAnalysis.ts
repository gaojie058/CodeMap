// src/gpt/prompts/businessFlowAnalysis.ts

export const businessFlowAnalysisPrompt = {
    name: 'businessFlowAnalysis',
    content: `For this business flow graph, please extract the files related understand the highlighted business flow and responsibilities in the whole project. 
  
  Output format: 
  A brief overview sentence related to this business flow.
  To achieve the overall goal, what role of the current highlighted business flow playes in the overall framework? 
  To achieve the overall goal, what is the role of each component under this business flow 
  
  Few-shot example: 
  
  ### Business Flow Overview 
  
  xxxxxx 
  
  ### Role of the Highlighted Business Flow in the Overall Framework 
  
  xxxxx 
  
  ### Roles of Each Component Under This Business Flow 
  
  1. *component1 (filename1,filename2...)*: 
  - decription1 
  - decription2
  … 
  2. *component2 (filename1,filename2...)*: 
  - decription1 
  - decription2
  …
  
  Please analyze the following highlighted business flow: {highlightedBusinessFlow}`
  };