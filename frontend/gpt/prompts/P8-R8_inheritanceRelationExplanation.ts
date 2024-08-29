// src/gpt/prompts/inheritanceRelationExplanation.ts

export const inheritanceRelationExplanationPrompt = {
    name: 'inheritanceRelationExplanation',
    content: `The inheritance graph is rendered in VScode, can you explain the inheritance relation in the highlighted line? 
  
  {inheritanceRelation}
  
  Few-shot example:
  {
  "inheritance_relationship": {
  "child_class": "ChildClass",
  "parent_class": "ParentClass"
  },
  "parent_class": {
  "name": "ParentClass",
  "purpose": "General description of the parent class's purpose",
  "role_in_system": "Description of the parent class's role in the overall system"
  },
  "child_class": {
  "name": "ChildClass",
  "purpose": "General description of the child class's purpose",
  "role_in_system": "Description of the child class's role in the overall system"
  },
  "significance_of_relationship": {
  "general_implication": "Description of what the inheritance implies",
  "specific_benefits": [
  "Benefit or feature enabled by this inheritance",
  "Another benefit or feature"
  ]
  },
  "summary": "A concise summary of the relationship and its importance in the system"
  }
  
  Please provide a detailed explanation of the inheritance relationship following this format.`
  };