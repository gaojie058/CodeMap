export const componentRelationAnalysisPrompt = {
  name: 'componentRelationAnalysis',
  content: `provide the following information in JSON format:
  {
    "Component Name": "Name of the Selected Component",
    "Neighbourhoood Components in the Project level": [
      {
        "name": "Component Name",
        "role": "Description of the neighbourhoood component role in the project level",
        "interactions with selected component": "How the selected component interacts with the neighbourhoood component"
        ]
      }
    ]
  }
  Provide the output strictly in this JSON format without any additional text or explanations.`
};