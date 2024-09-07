// src/gpt/prompts/projectAnalysisJson.ts

export const projectAnalysisJsonPrompt = {
    name: 'projectAnalysisJson',
    content: `Interpret this project and return the following information in JSON format: 
  1. Project structure; 
  2. Distribution of modules in the project structure; 
  3. Distribution of files in the project structure; 
  4. Functional relationships and business interactions between the modules of the project; 
  5. Business relations and logical interactions between the files of the project; 
  6. Functional descriptions of each module of the project; 
  7. Functional descriptions of each file in the project. 
  Each description must contain at least 100 words. Each piece of information should be returned as a separate JSON section. The business relations and interactions must be clearly and thoroughly explained. 
  
  Output like the following json example:
  {
  "project_overview":"....(in one sentence, expand the sentence to describe the project)",
  名词解释
  "project_structure": {
  "xxxxx.xxxx": "description"
  ...
  },
  "module_distribution": {
  "xxxxx(modulename)":"...."
  },
  "file_distribution": {
  "xxxxx(filename)":".....
  },
  "functional_relationships_modules": {
  "xxxxx(modulename)":"...."
  },
  "business_relations_files": {
  "xxxxx(filename)":".....
  },
  "functional_descriptions_modules": {
  "xxxxx(modulename)":"...."
  },
  "functional_descriptions_files": {
  "xxxxx(filename)":".....
  }
  }`
  };