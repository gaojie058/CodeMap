export const functionCallLocalExplainPrompt = {
  name: 'functionCallLocalExplain',
  content: `Explain the relevant inheritance flow for the selected node {selectedNode}. Provide the output in the following JSON format:


{
  "relevantInheritance": [
    {
      "name": "Inheritance Flow Overview",
      "key": "inheritance_flow_overview",
      "value": "Brief overview of the relevant inheritance flow"
    },
    {
      "name": "Role of the Inheritance Flow in the Overall Framework",
      "key": "role_in_framework",
      "value": "Description of how this inheritance flow fits into the larger system"
    },
    {
      "name": "Roles of Each function understand this Inheritance Flow",
      "key": "function_roles",
      "value": {
        "function1": "Role and purpose of function1",
        "function2": "Role and purpose of function2"
        // ... more functions as needed
      }
    }
  ]
}

Ensure the output is strictly in this JSON format without any additional text or explanations.`
};