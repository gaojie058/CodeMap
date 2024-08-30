// src/components/FnGlobalUnderstanding/index.tsx

import React from 'react';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import { GptComponent } from '@gpt/GptComponent';
import useStore from '@/store/store';
import { LocalGraph } from '../../graph';

const businessFlowUnderstandings = [
  { name: 'Business Flow Overview', key: 'Business Flow Overview' },
  { name: 'Role of the Highlighted Business Flow in the Overall Framework', key: 'Role of the Highlighted Business Flow in the Overall Framework' },
  { name: 'Roles of Each Component Under This Business Flow', key: 'Roles of Each Component Under This Business Flow' },
];

const componentRelationUnderstandings = [
  { name: 'Project Name', key: 'project_name' },
  { name: 'Components', key: 'components' },
  { name: 'Processes', key: 'processes' },
  { name: 'Key Concepts', key: 'key_concepts' },
  { name: 'Additional Notes', key: 'additional_notes' },
];

function extractJsonFromText(responseText: string) {
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  }
  console.error('No valid JSON found in the response');
  return null;
}

const FnGlobalUnderstanding: React.FC = () => {
  const { 
    bizCompLocalDOT, setBizCompLocalDOT,
    businessFlowAnalysis, setBusinessFlowAnalysis, 
    componentRelationAnalysis, setComponentRelationAnalysis 
  } = useStore();

  const handleBusinessLocalGraphResponse = (res: string | null) => {
    if (res) {
      setBizCompLocalDOT(res);
    }
  };

  const handleBusinessFlowResponse = (res: string | null) => {
    if (res) {
      const jsonData = extractJsonFromText(res);
      setBusinessFlowAnalysis(jsonData);
    }
  };

  const handleComponentRelationResponse = (res: string | null) => {
    if (res) {
      const jsonData = extractJsonFromText(res);
      setComponentRelationAnalysis(jsonData);
    }
  };

  const formatValue = (value: any): string => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) {
      return value.map((item, index) => {
        if (typeof item === 'object') {
          return Object.entries(item)
            .map(([key, val]) => `${key}: ${val}`)
            .join('\n');
        }
        return `${index + 1}. ${item}`;
      }).join('\n');
    }
    if (typeof value === 'object') {
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join('\n');
    }
    return JSON.stringify(value);
  };

  return (
    <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
      <h2>Business Local Graph</h2>
      {bizCompLocalDOT && (
        <LocalGraph
          dot={bizCompLocalDOT}
          onExpand={() => {}}
          onRegenerate={() => {}}
        />
      )}

      <h2>Business Flow Analysis</h2>
      {businessFlowUnderstandings.map((item) => (
        <DisclosureItem 
          key={item.key}
          item={{
            name: item.name,
            key: item.key,
            value: businessFlowAnalysis ? formatValue(businessFlowAnalysis[item.key]) : null
          }}
        />
      ))}

      <h2>Component Relation Analysis</h2>
      {componentRelationUnderstandings.map((item) => (
        <DisclosureItem 
          key={item.key}
          item={{
            name: item.name,
            key: item.key,
            value: componentRelationAnalysis ? formatValue(componentRelationAnalysis[item.key]) : null
          }}
        />
      ))}

      {!bizCompLocalDOT && (
        <GptComponent
          queryType='P3_R3_businessLocalGraph'
          onResponseReceived={handleBusinessLocalGraphResponse}
        />
      )}

      {!businessFlowAnalysis && (
        <GptComponent
          queryType='P4_R4_businessFlowAnalysis'
          onResponseReceived={handleBusinessFlowResponse}
        />
      )}

      {!componentRelationAnalysis && (
        <GptComponent
          queryType='P5_R5_componentRelationAnalysis'
          onResponseReceived={handleComponentRelationResponse}
        />
      )}
    </div>
  );
};

export default FnGlobalUnderstanding;