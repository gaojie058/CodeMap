// src/gpt/prompts/index.ts

import { projectOverviewPrompt } from './projectOverview'; //project overview in business page
import { systemStructureDotPrompt } from './P2-R2_systemStructureDot'; //both business dot graph + json overview 
import { businessComponentFlowPrompt } from './businessComponentFlow'; //only business component flow
import { businessLocalGraphPrompt } from './P3-R3_businessLocalGraph'; //only business local map
import { businessFlowAnalysisPrompt } from './P4-R4_businessFlowAnalysis'; //only business flow textual explanation
import { componentRelationAnalysisPrompt } from './P5-R5_componentRelationAnalysis'; //only component relation textual explanation
import { projectStructureJsonPrompt } from './P7-R7_projectStructureJson'; //both business dot graph + json overview 
import { functionCallLocalDescPrompt } from './P8-R8_functionCallLocalDesc'; //only function call local textual explanation
import { functionCallFlowPrompt } from './P9-R9_functionCallFlow'; //only function call flow textual explanation
import { functionCallLocalExplainPrompt } from './P10-R10_functionCallLocalExplain'; //only function call local textual explanation


export const prompts = {
  P2_R2_systemStructureDot: systemStructureDotPrompt,
  P3_R3_businessLocalGraph: businessLocalGraphPrompt,
  P4_R4_businessFlowAnalysis: businessFlowAnalysisPrompt,
  P5_R5_componentRelationAnalysis: componentRelationAnalysisPrompt,
  P7_R7_projectStructureJson: projectStructureJsonPrompt,
  P8_R8_functionCallLocalDesc: functionCallLocalDescPrompt,
  P9_R9_functionCallFlow: functionCallFlowPrompt,
  P10_R10_functionCallLocalExplain: functionCallLocalExplainPrompt,
  projectOverview: projectOverviewPrompt,
  businessComponentFlow: businessComponentFlowPrompt,
};

export type PromptName = keyof typeof prompts;