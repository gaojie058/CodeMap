// src/gpt/prompts/index.ts

import { projectAnalysisPrompt } from './projectAnalysis';
import { systemStructurePrompt } from './systemStructure';
import { businessFlowAnalysisPrompt } from './businessFlowAnalysis';
import { componentRelationAnalysisPrompt } from './componentRelationAnalysis';
import { projectOverviewPrompt } from './projectOverview';
import { inheritanceGraphPrompt } from './inheritanceGraph';
import { inheritanceRelationExplanationPrompt } from './inheritanceRelationExplanation';
import { functionCallFlowPrompt } from './functionCallFlow';
import { projectAnalysisJsonPrompt } from './projectAnalysisJson';
import { systemStructureDotPrompt } from './systemStructureDot';
import { functionCallFlowDotPrompt } from './functionCallFlowDot';
import { businessLocalGraphPrompt } from './businessLocalGraph';
import { functionCallLocalDescPrompt } from './functionCallLocalDesc';
import { functionCallLocalExplainPrompt } from './functionCallLocalExplain';
import { projectStructureJsonPrompt } from './projectStructureJson'; // Add this line
import { businessComponentFlowPrompt } from './businessComponentFlow';
import { inheritanceFlowExplanationPrompt } from './inheritanceFlowExplanation';

export const prompts = {
  projectAnalysis: projectAnalysisPrompt,
  systemStructure: systemStructurePrompt,
  businessFlowAnalysis: businessFlowAnalysisPrompt,
  componentRelationAnalysis: componentRelationAnalysisPrompt,
  projectOverview: projectOverviewPrompt,
  inheritanceGraph: inheritanceGraphPrompt,
  inheritanceRelationExplanation: inheritanceRelationExplanationPrompt,
  functionCallFlow: functionCallFlowPrompt,
  projectAnalysisJson: projectAnalysisJsonPrompt,
  systemStructureDot: systemStructureDotPrompt,
  functionCallFlowDot: functionCallFlowDotPrompt,
  businessLocalGraph: businessLocalGraphPrompt,
  functionCallLocalDesc: functionCallLocalDescPrompt,
  functionCallLocalExplain: functionCallLocalExplainPrompt,
  projectStructureJson: projectStructureJsonPrompt,
  businessComponentFlow: businessComponentFlowPrompt,
  inheritanceFlowExplanation: inheritanceFlowExplanationPrompt,
  // 添加更多 prompts...
};

export type PromptName = keyof typeof prompts;