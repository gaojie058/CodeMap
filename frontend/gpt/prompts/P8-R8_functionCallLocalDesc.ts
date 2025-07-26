export const functionCallLocalDescPrompt = {
  name: 'functionCallLocalDesc',
  content: `
  Explain the details for the selcted node {selectedNode}. Provide the output in the following JSON format:
{
  "highlightedInheritance": [
    {
      "name": "Class Overview",
      "value": "Brief overview of the Selected Class and its flow"
    },
    {
      "name": "Role of the Class in the Overall CodeBase",
      "value": "Description of how this class fits in the overall codebase"
    },
    {
      "name": "Roles of the key functions under this Class",
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