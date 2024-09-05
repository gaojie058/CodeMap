export const projectStructureJsonPrompt = {
  name: 'projectStructureJson',
  content: `Analyze the project and return the following information in JSON format:
  {
    "Overview": "A brief overview of the entire project structure",
    "Modules": [
      {
        "name": "Module Name",
        "description": "Brief description of the module's purpose",
        "files": [
          {
            "name": "filename",
            "description": "Detailed description of the file's contents and purpose"
          }
        ]
      }
    ],
    "Relationships": [
      "Description of relationship between modules or files"
    ]
  }
  Ensure each module description is concise and each file description is detailed. Provide the output strictly in this JSON format without any additional text or explanations.`,
};