// src/gpt/queryDefinitions.ts

import { PromptName } from './prompts';

export interface QueryDefinition {
  promptName: PromptName;
  contentTemplate: string;
  description: string;
}

export type QueryType = keyof typeof queryDefinitions;

export const queryDefinitions = {
  projectAnalysis: {
    promptName: 'projectAnalysis' as PromptName,
    contentTemplate: 'Analyze the following project: {projectName}',
    description: 'Analyzes the structure and functionality of a project'
  },
  systemStructure: {
    promptName: 'systemStructure' as PromptName,
    contentTemplate: 'Generate a system structure diagram for the current project.',
    description: 'Generates a detailed system structure diagram using DOT language'
  },
  businessFlowAnalysis: {
    promptName: 'businessFlowAnalysis' as PromptName,
    contentTemplate: 'Analyze the following highlighted business flow: {highlightedBusinessFlow}',
    description: 'Analyzes a specific business flow within the project'
  },
  componentRelationAnalysis: {
    promptName: 'componentRelationAnalysis' as PromptName,
    contentTemplate: 'could you help me understand which components are related to {relatedComponent}, and what is their main communication?',
    description: 'Analyzes the relationships and communications between components'
  },
  projectOverview: {
    promptName: 'projectOverview' as PromptName,
    contentTemplate: 'Generate a comprehensive project overview based on the uploaded codebase.',
    description: 'Generates a detailed project overview in DOT language'
  },
  inheritanceGraph: {
    promptName: 'inheritanceGraph' as PromptName,
    contentTemplate: 'Generate an inheritance graph based on the uploaded codebase.',
    description: 'Generates an inheritance graph in DOT language'
  },
  inheritanceRelationExplanation: {
    promptName: 'inheritanceRelationExplanation' as PromptName,
    contentTemplate: 'Explain the inheritance relation: {inheritanceRelation}',
    description: 'Explains a specific inheritance relationship in the codebase'
  },
  functionCallFlow: {
    promptName: 'functionCallFlow' as PromptName,
    contentTemplate: 'Generate function call flow for the selected node: {selectedNode}',
    description: 'Generates a function call flow diagram for a selected node in the inheritance graph'
  },
  projectAnalysisJson: {
    promptName: 'projectAnalysisJson' as PromptName,
    contentTemplate: 'Analyze the project structure and return detailed information in JSON format.',
    description: 'Generates a comprehensive JSON analysis of the project structure and functionality'
  },
  systemStructureDot: {
    promptName: 'systemStructureDot' as PromptName,
    contentTemplate: 'Generate a detailed system structure diagram using DOT language.',
    description: 'Creates a DOT language representation of the system structure with detailed component relationships'
  },
  functionCallFlowDot: {
    promptName: 'functionCallFlowDot' as PromptName,
    contentTemplate: 'Generate a function call flow diagram for the file or component: {fileOrComponent}',
    description: 'Generates a DOT language representation of the function call flow for a specific file or component'
  },
  // 可以继续添加更多的查询定义...
};

export function generateContent(queryType: QueryType, params: Record<string, string> = {}): string {
  const query = queryDefinitions[queryType];
  let content = query.contentTemplate;
  for (const [key, value] of Object.entries(params)) {
    content = content.replace(`{${key}}`, value);
  }
  return content;
}