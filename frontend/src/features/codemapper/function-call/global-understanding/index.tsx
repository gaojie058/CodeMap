import React from 'react';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import { GptComponent } from '@gpt/GptComponent';
import useStore from '@/store/store';

const understandings = [
  { name: 'Overview', key: 'Overview' },
  { name: 'Inheritance Relationship', key: 'Inheritance Relationship' },
  { name: 'Parent Class', key: 'Parent Class' },
  { name: 'Child Class', key: 'Child Class' },
  { name: 'Significance of Relationship', key: 'Significance of Relationship' },
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
  const { fnGlobalUnderstanding, setFnGlobalUnderstanding } = useStore();

  const handleResponse = (res: string | null) => {
    if (res) {
      const jsonData = extractJsonFromText(res);
      setFnGlobalUnderstanding(jsonData);
    }
  };

  const formatValue = (value: any): string => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join('\n');
    }
    return JSON.stringify(value);
  };

  return (
    <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
      {understandings.map((item) => (
        <DisclosureItem 
          key={item.key}
          item={{
            name: item.name,
            key: item.key,
            value: fnGlobalUnderstanding ? formatValue(fnGlobalUnderstanding[item.key]) : null
          }}
        />
      ))}

      {!fnGlobalUnderstanding && (
        <GptComponent
          queryType='P7_R7_projectStructureJson'
          onResponseReceived={handleResponse}
        />
      )}
    </div>
  );
};

export default FnGlobalUnderstanding;