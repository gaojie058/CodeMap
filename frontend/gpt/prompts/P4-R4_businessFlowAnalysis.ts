// src/gpt/prompts/P4-R4_businessFlowAnalysis.ts

export const businessFlowAnalysisPrompt = {
  name: 'businessFlowAnalysis',
  content: `Analyze the highlighted business flow and provide the following information in JSON format:
  {
    "Business Flow Overview": "A brief overview sentence related to this business flow.",
    "Role of the Highlighted Business Flow in the Overall Framework": "Explanation of the role this business flow plays in the overall framework.",
    "Roles of Each Component Under This Business Flow": [
      {
        "name": "ComponentName",
        "files": ["filename1", "filename2"],
        "descriptions": [
          "description1",
          "description2"
        ]
      }
    ]
  }
  Please analyze the following highlighted business flow: {highlightedBusinessFlow}
  Provide the output strictly in this JSON format without any additional text or explanations.`
};