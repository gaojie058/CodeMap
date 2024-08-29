// src/gpt/prompts/componentRelationAnalysis.ts

export const componentRelationAnalysisPrompt = {
    name: 'componentRelationAnalysis',
    content: `could you help me understand which components are related to {relatedComponent}, and what is their main communication?
  
  Few-shot example: 
  {
  "project_name": "Generic Project Structure",
  "components": [
  {
  "id": "component1",
  "name": "Component 1",
  "role": "Description of Component 1's role",
  "interactions": [
  {"with": "component2", "description": "How Component 1 interacts with Component 2"},
  {"with": "component3", "description": "How Component 1 interacts with Component 3"}
  ]
  },
  {
  "id": "component2",
  "name": "Component 2",
  "role": "Description of Component 2's role",
  "interactions": [
  {"with": "component1", "description": "How Component 2 interacts with Component 1"},
  {"with": "component4", "description": "How Component 2 interacts with Component 4"}
  ]
  }
  ],
  "processes": [
  {
  "name": "Process 1",
  "steps": [
  {
  "step": 1,
  "description": "Description of step 1",
  "involved_components": ["component1", "component2"]
  },
  {
  "step": 2,
  "description": "Description of step 2",
  "involved_components": ["component2", "component3"]
  }
  ]
  },
  {
  "name": "Process 2",
  "steps": [
  {
  "step": 1,
  "description": "Description of step 1 in Process 2",
  "involved_components": ["component3", "component4"]
  }
  ]
  }
  ],
  "key_concepts": [
  {
  "name": "Concept 1",
  "description": "Explanation of Concept 1"
  },
  {
  "name": "Concept 2",
  "description": "Explanation of Concept 2"
  }
  ],
  "additional_notes": "Any additional information or context about the project structure"
  }`
  };