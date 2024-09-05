import React, { useState } from 'react';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import { GptComponent } from '@gpt/GptComponent';
import useStore from '@/store/store';
import Spinner from '@/components/Elements/Spinner/Spinner';

const understandings = [
  { name: 'Overview', key: 'Overview', value: '' },
  { name: 'Modules', key: 'Modules', value: '' },
  { name: 'Relationships', key: 'Relationships', value: '' },
];

function extractJsonFromText(responseText: string) {
  const jsonPattern = /```json\s*(\{[\s\S]*?\})\s*```/;
  const match = responseText.match(jsonPattern);

  if (match) {
    const jsonStr = match[1];
    try {
      const jsonData = JSON.parse(jsonStr);
      understandings.forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(jsonData, item.key)) {
          item.value = JSON.stringify(jsonData[item.key]);
        }
      });
      return jsonData;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return null;
    }
  } else {
    console.warn('No JSON found in the response text');
    return null;
  }
}

const FnGlobalUnderstanding: React.FC = () => {
  const { fnGlobalUnderstanding, setFnGlobalUnderstanding } = useStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResponse = (res: string | null) => {
    if (res) {
      const jsonData = extractJsonFromText(res);
      console.log('Global understanding:', jsonData);
      setFnGlobalUnderstanding(jsonData);
    }
  };

  const handleLoadingChange = (loading: boolean) => setIsLoading(loading);

  return (
    <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
      {isLoading ? (
        <Spinner loadingText='Loading Project Overview...' />
      ) : (
        understandings[0].value &&
        understandings.map((item, index) => (
          <DisclosureItem item={item} key={`func-global-${index}`} />
        ))
      )}

      {!fnGlobalUnderstanding && (
        <GptComponent
          queryType='P7_R7_projectStructureJson'
          onResponseReceived={handleResponse}
          onLoadingChange={handleLoadingChange}
        />
      )}
    </div>
  );
};

export default FnGlobalUnderstanding;
