// src/gpt/prompts/index.ts

// import { projectAnalysisPrompt } from './P1-R1_projectAnalysis';
// import { systemStructurePrompt } from './P2-R2_systemStructure';
import { businessFlowAnalysisPrompt } from './P4-R4_businessFlowAnalysis';
import { componentRelationAnalysisPrompt } from './P5-R5_componentRelationAnalysis';
import { projectOverviewPrompt } from './projectOverview';
// import { inheritanceGraphPrompt } from './P6-R6_inheritanceGraph';
// import { inheritanceRelationExplanationPrompt } from './P8-R8_inheritanceRelationExplanation';
import { functionCallFlowPrompt } from './P9-R9_functionCallFlow';
// import { projectAnalysisJsonPrompt } from './P1-R1_projectAnalysisJson';
import { systemStructureDotPrompt } from './P2-R2_systemStructureDot';
// import { functionCallFlowDotPrompt } from './P9-R9_functionCallFlowDot';
import { businessLocalGraphPrompt } from './P3-R3_businessLocalGraph';
import { functionCallLocalDescPrompt } from './P8-R8_functionCallLocalDesc';
import { functionCallLocalExplainPrompt } from './P10-R10_functionCallLocalExplain';
import { projectStructureJsonPrompt } from './P7-R7_projectStructureJson';
import { businessComponentFlowPrompt } from './businessComponentFlow';
// import { inheritanceFlowExplanationPrompt } from './P10-R10_inheritanceFlowExplanation';

export const prompts = {
  // P1_R1_projectAnalysis: projectAnalysisPrompt,
  // P2_R2_systemStructure: systemStructurePrompt,
  P3_R3_businessLocalGraph: businessLocalGraphPrompt,
  P4_R4_businessFlowAnalysis: businessFlowAnalysisPrompt,
  P5_R5_componentRelationAnalysis: componentRelationAnalysisPrompt,
  // P6_R6_inheritanceGraph: inheritanceGraphPrompt,
  P7_R7_projectStructureJson: projectStructureJsonPrompt,
  // P8_R8_inheritanceRelationExplanation: inheritanceRelationExplanationPrompt,
  P8_R8_functionCallLocalDesc: functionCallLocalDescPrompt,
  P9_R9_functionCallFlow: functionCallFlowPrompt,
  // P9_R9_functionCallFlowDot: functionCallFlowDotPrompt,
  P10_R10_functionCallLocalExplain: functionCallLocalExplainPrompt,
  // P10_R10_inheritanceFlowExplanation: inheritanceFlowExplanationPrompt,
  // P1_R1_projectAnalysisJson: projectAnalysisJsonPrompt,
  P2_R2_systemStructureDot: systemStructureDotPrompt,
  projectOverview: projectOverviewPrompt,
  businessComponentFlow: businessComponentFlowPrompt,
};

export type PromptName = keyof typeof prompts;