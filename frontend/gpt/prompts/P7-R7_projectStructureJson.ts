// src/gpt/prompts/P7-R7_projectStructureJson.ts

export const projectStructureJsonPrompt = {
  name: 'projectStructureJson',
  content: `Analyze the project and return the following information in JSON format:
  {
    "Overview": "A brief overview of the project structure and main components",
    "Inheritance Relationship": "Description of key inheritance relationships in the project",
    "Parent Class": "Information about important parent classes",
    "Child Class": "Information about significant child classes",
    "Significance of Relationship": "Explanation of the significance of these inheritance relationships in the project architecture"
  }
  Provide the output strictly in this JSON format without any additional text or explanations.`,
};