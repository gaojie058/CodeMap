import React from 'react';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import { GptComponent } from '@gpt/GptComponent';
import useStore from '@/store/store';

const understandings = [
  { name: 'Overview', key: 'Overview', value: '' },
  { name: 'Modules', key: 'Modules', value: '' },
  { name: 'Relationships', key: 'Relationships', value: '' },
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
      console.log('Global understanding:', jsonData);
      setFnGlobalUnderstanding(jsonData);
    }
  };

  const formatValue = (value: any, key: string): string => {
    if (key === 'Overview' || key === 'Relationships') {
      return Array.isArray(value) ? value.map(item => `• ${item}`).join('\n\n') : value;
    }
    if (key === 'Modules') {
      return value.map((module: any) => `
  • ${module.name}
  
    ${module.description}
  
    Files:
  ${module.files.map((file: any) => `
    • ${file.name}
      
      ${file.description.replace(/\n/g, '\n    ').replace(/(.{80})/g, "$1\n    ")}`).join('\n')}
  `).join('\n');
    }
    return JSON.stringify(value, null, 2);
  };

  return (
    <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
      {understandings.map((item) => (
        <DisclosureItem
          key={item.key}
          item={{
            name: item.name,
            key: item.key,
            value: fnGlobalUnderstanding ? formatValue(fnGlobalUnderstanding[item.key], item.key) : null
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