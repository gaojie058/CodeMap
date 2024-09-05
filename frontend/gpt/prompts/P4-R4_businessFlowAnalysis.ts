export const businessFlowAnalysisPrompt = {
  name: 'businessFlowAnalysis',
  content: `Analyze the highlighted business flow for {selectedNode} and provide the following information in JSON format:
  {
    "Business Flow Overview": "A brief overview of the business flow.",
    "Role of the Highlighted Business Flow in the Overall Framework": "Explanation of how this business flow fits into the larger system.",
    "Roles of Each Component Under This Business Flow": {
      "Component1": "Role and purpose of Component1",
      "Component2": "Role and purpose of Component2"
    }
  
  Provide the output strictly in this JSON format without any additional text or explanations.`
};