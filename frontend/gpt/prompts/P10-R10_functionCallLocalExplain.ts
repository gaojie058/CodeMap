export const functionCallLocalExplainPrompt = {
  name: 'functionCallLocalExplain',
  content: `Explain the relevant inheritance flow for the selected node {selectedNode}. Provide the output in the following JSON format:


{
  "relevantInheritance": [
    {
      "name": "Class Name",
      "key": "inheritance_flow_overview",
      "value": "Name of the Selected Class"
    }
    {
      "name": "Neighbourhoood Classes in the Project level",
      "key": "function_roles",
      "value": {
        "name": "Class Name",
        "role": "Description of the neighbourhoood Class role in the project level",
        "interactions with selected Class": "How the selected Class interacts with the neighbourhoood Class"
        ]
      }
    }
  ]
}

Ensure the output is strictly in this JSON format without any additional text or explanations.`
};