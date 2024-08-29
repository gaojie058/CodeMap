import React, { useEffect, useMemo, useState } from 'react';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import { GptComponent } from '@gpt/GptComponent';
import useStore from '@/store/store';

// defines `understandings` that will be rendered as collapsible items
// TODO: add data from `GptComponent`
const understandings = [
  {
    name: 'Overview',
    api: '',
  },
  {
    name: 'Inheritance Relationship',
    api: '',
  },
  {
    name: 'Parent Class',
    api: '',
  },
  {
    name: 'Child Class',
    api: '',
  },
  {
    name: 'Significance of Relationship',
    api: '',
  },
];

function extractJsonFromText(responseText: string) {
  const jsonPattern = /{[^]*}/;
  const match = responseText.match(jsonPattern);

  if (match) {
    try {
      const jsonData = JSON.parse(match[0]);
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

/**
 * Renders `Global Understanding` section of `Function Call` page.
 * This component is used within the `Toolbar` to display a list of items with collapsible details.
 */
const FnGlobalUnderstanding: React.FC = () => {
  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const { fnGlobalUnderstanding, setFnGlobalUnderstanding } = useStore();

  const handleResponse = (res: string | null) => setGptResponse(res);

  useEffect(() => {
    if (gptResponse) {
      setFnGlobalUnderstanding(extractJsonFromText(gptResponse));
    }
  }, [gptResponse]);

  return (
    <>
      <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
        {understandings.map((item, index) => (
          <DisclosureItem item={item} key={index} />
        ))}

        {/* NEED TO CHANGE PROMPT */}
        {!fnGlobalUnderstanding && (
          <GptComponent
            queryType='P7_R7_projectStructureJson'
            onResponseReceived={handleResponse}
          />
        )}
      </div>
    </>
  );
};

export default FnGlobalUnderstanding;
