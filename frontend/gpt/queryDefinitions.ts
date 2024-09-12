// src/gpt/queryDefinitions.ts

import { PromptName } from './prompts';

export interface QueryDefinition {
  promptName: PromptName;
  contentTemplate: string;
  description: string;
}

export type QueryType = keyof typeof queryDefinitions;

export const queryDefinitions = {
  P1_R1_projectAnalysis: {
    promptName: 'P1_R1_projectAnalysis' as PromptName,
    contentTemplate: 'Analyze the following project: {projectName}',
    description: 'Analyzes the structure and functionality of a project'
  },
  P2_R2_systemStructure: {
    promptName: 'P2_R2_systemStructure' as PromptName,
    contentTemplate: 'Generate a system structure diagram for the current project.',
    description: 'Generates a detailed system structure diagram using DOT language'
  },
  P4_R4_businessFlowAnalysis: {
    promptName: 'P4_R4_businessFlowAnalysis' as PromptName,
    contentTemplate: 'Analyze the following highlighted business flow: {highlightedBusinessFlow}',
    description: 'Analyzes a specific business flow within the project'
  },
  P5_R5_componentRelationAnalysis: {
    promptName: 'P5_R5_componentRelationAnalysis' as PromptName,
    contentTemplate: 'could you help me understand which components are related to {relatedComponent}, and what is their main communication?',
    description: 'Analyzes the relationships and communications between components'
  },
  projectOverview: {
    promptName: 'projectOverview' as PromptName,
    contentTemplate: 'Generate a comprehensive project overview based on the uploaded codebase.',
    description: 'Generates a detailed project overview in DOT language'
  },
  P6_R6_inheritanceGraph: {
    promptName: 'P6_R6_inheritanceGraph' as PromptName,
    contentTemplate: 'Generate an inheritance graph based on the uploaded codebase.',
    description: 'Generates an inheritance graph in DOT language'
  },
  P8_R8_inheritanceRelationExplanation: {
    promptName: 'P8_R8_inheritanceRelationExplanation' as PromptName,
    contentTemplate: 'Explain the Details of the selcted node: {inheritanceRelation}',
    description: 'Explains a specific inheritance relationship in the codebase'
  },
  P9_R9_functionCallFlow: {
    promptName: 'P9_R9_functionCallFlow' as PromptName,
    contentTemplate: 'Generate function call flow for the selected node: {selectedNode}',
    description: 'Generates a function call flow diagram for a selected node in the inheritance graph'
  },
  P1_R1_projectAnalysisJson: {
    promptName: 'P1_R1_projectAnalysisJson' as PromptName,
    contentTemplate: 'Analyze the project structure and return detailed information in JSON format.',
    description: 'Generates a comprehensive JSON analysis of the project structure and functionality'
  },
  P2_R2_systemStructureDot: {
    promptName: 'P2_R2_systemStructureDot' as PromptName,
    contentTemplate: 'Generate a detailed system structure diagram using DOT language.',
    description: 'Creates a DOT language representation of the system structure with detailed component relationships'
  },
  P9_R9_functionCallFlowDot: {
    promptName: 'P9_R9_functionCallFlowDot' as PromptName,
    contentTemplate: 'Generate a function call flow diagram for the file or component: {fileOrComponent}',
    description: 'Generates a DOT language representation of the function call flow for a specific file or component'
  },
  P3_R3_businessLocalGraph: {
    promptName: 'P3_R3_businessLocalGraph' as PromptName,
    contentTemplate: 'Generate a business component flow diagram for the selected node: {selectedNode}',
    description: 'Generates a DOT language representation of the business component flow for a specific file or component'
  },
  P8_R8_functionCallLocalDesc: {
    promptName: 'P8_R8_functionCallLocalDesc' as PromptName,
    contentTemplate: 'Generate a function call flow for the selected node: {selectedNode}',
    description: 'Generates a comprehensive JSON analysis of the project structure and functionality'
  },
  P10_R10_functionCallLocalExplain: {
    promptName: 'P10_R10_functionCallLocalExplain' as PromptName,
    contentTemplate: 'Generate a function call flow for the selected node: {selectedNode}',
    description: 'Generates a comprehensive JSON analysis of the project structure and functionality'
  },
  P7_R7_projectStructureJson: {
    promptName: 'P7_R7_projectStructureJson' as PromptName,
    contentTemplate: 'Analyze the project structure and return detailed information in JSON format.',
    description: 'Generates a comprehensive JSON analysis of the project structure and module relationships'
  },
  businessComponentFlow: {
    promptName: 'businessComponentFlow' as PromptName,
    contentTemplate: 'Generate a business component flow diagram for the selected node: {selectedNode}',
    description: 'Generates a DOT language representation of the business component flow for a specific component'
  },
  P10_R10_inheritanceFlowExplanation: {
    promptName: 'P10_R10_inheritanceFlowExplanation' as PromptName,
    contentTemplate: 'Explain the inheritance flow for the selected node: {selectedNode}',
    description: 'Generates a JSON representation of the inheritance flow for a specific component'
  },
  // You can continue adding more query definitions...
};

export function generateContent(queryType: QueryType, params: Record<string, string> = {}): string {
  const query = queryDefinitions[queryType];
  let content = query.contentTemplate;
  for (const [key, value] of Object.entries(params)) {
    content = content.replace(`{${key}}`, value);
  }
  return content;
}