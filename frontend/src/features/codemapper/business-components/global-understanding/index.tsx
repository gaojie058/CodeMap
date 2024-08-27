import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';

// defines `understandings` that will be rendered as collapsible items
// TODO: add data from `GptComponent`
const understandings = [
  {
    name: 'Project Structure',
  },
  {
    name: 'Distribution of Modules in the Project Structure',
  },
  {
    name: 'Distribution of Files in the Project Structure',
  },
  {
    name: 'Functional Relationships and Business Interactions Between the Modules of the Project',
  },
  {
    name: 'Business Relations and Logical Interactions Between the Files of the Project',
  },
  {
    name: 'Functional Descriptions of Each Module of the Project',
  },
  {
    name: 'Functional Descriptions of Each File in the Project',
  },
];

// fix
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
 * Renders `Global Understanding` section of `Business Components` page.
 * This component is used within the `Toolbar` to display a list of items with collapsible details.
 */
const BizGlobalUnderstanding: React.FC = () => {
  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const { bizGlobalUnderstanding, setBizGlobalUnderstanding } = useStore();

  const handleResponse = (res: string | null) => setGptResponse(res);

  useEffect(() => {
    if (gptResponse) {
      setBizGlobalUnderstanding(extractJsonFromText(gptResponse));
    }
  }, [gptResponse]);

  return (
    <>
      <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
        {understandings.map((item, index) => (
          <DisclosureItem item={item} key={index} />
        ))}

        {/* Need to parse data into disclosure items above */}
        {!bizGlobalUnderstanding && (
          <GptComponent
            queryType='projectAnalysisJson'
            onResponseReceived={handleResponse}
          />
        )}
      </div>
    </>
  );
};

export default BizGlobalUnderstanding;
