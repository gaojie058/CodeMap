export const componentRelationAnalysisPrompt = {
  name: 'componentRelationAnalysis',
  content: `Analyze the components related to {selectedNode} and provide the following information in JSON format:
  {
    "project_name": "Name of the project",
    "components": [
      {
        "id": "componentId",
        "name": "Component Name",
        "role": "Description of the component's role",
        "interactions": [
          {
            "with": "otherComponentId",
            "description": "How this component interacts with the other component"
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
            "involved_components": ["componentId1", "componentId2"]
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
    "additional_notes": "Any additional information or context about the component relationships"
  }
  Provide the output strictly in this JSON format without any additional text or explanations.`
};