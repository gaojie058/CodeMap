// src/gpt/prompts/P5-R5_componentRelationAnalysis.ts

export const componentRelationAnalysisPrompt = {
  name: 'componentRelationAnalysis',
  content: `Analyze the components related to {relatedComponent} and provide the following information in JSON format:
  {
    "project_name": "Name of the project",
    "components": [
      {
        "id": "component_id",
        "name": "Component Name",
        "role": "Description of the component's role",
        "interactions": [
          {
            "with": "other_component_id",
            "description": "Description of how this component interacts with the other component"
          }
        ]
      }
    ],
    "processes": [
      {
        "name": "Process Name",
        "steps": [
          {
            "step": 1,
            "description": "Description of the step",
            "involved_components": ["component_id1", "component_id2"]
          }
        ]
      }
    ],
    "key_concepts": [
      {
        "name": "Concept Name",
        "description": "Explanation of the concept"
      }
    ],
    "additional_notes": "Any additional information or context about the project structure"
  }
  Provide the output strictly in this JSON format without any additional text or explanations.`
};