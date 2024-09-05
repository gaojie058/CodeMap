import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import Spinner from '@/components/Elements/Spinner/Spinner';

// defines `understandings` that will be rendered as collapsible items
// TODO: add data from `GptComponent`
const understandings = [
  {
    name: 'Project Structure',
    key: 'project_structure',
    value:'',
  },
  {
    name: 'Distribution of Modules in the Project Structure',
    key: 'module_distribution',
    value:'',
  },
  {
    name: 'Distribution of Files in the Project Structure',
    key:'file_distribution',
    value:'',
  },
  {
    name: 'Functional Relationships and Business Interactions Between the Modules of the Project',
    key:'functional_relationships_modules',
    value:'',
  },
  {
    name: 'Business Relations and Logical Interactions Between the Files of the Project',
    key:'business_relations_files',
    value:'',
  },
  {
    name: 'Functional Descriptions of Each Module of the Project',
    key:'functional_descriptions_modules',
    value:'',
  },
  {
    name: 'Functional Descriptions of Each File in the Project',
    key:'functional_descriptions_files',
    value:'',
  },
];

// fix
function extractJsonFromText(responseText: string) {
  const jsonPattern = /```json\s*(\{[\s\S]*?\})\s*```/;
  const match = responseText.match(jsonPattern);

  if (match) {
    const jsonStr = match[1]
    try {
      const jsonData = JSON.parse(jsonStr);
      understandings.forEach(item => {
        if (Object.prototype.hasOwnProperty.call(jsonData, item.key)) {
          item.value = JSON.stringify(jsonData[item.key]);
        }
      })
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { bizGlobalUnderstanding, setBizGlobalUnderstanding } = useStore();

  const handleResponse = (res: string | null) => setGptResponse(res);
  const handleLoadingChange = (loading: boolean) => setIsLoading(loading);

  useEffect(() => {
    if (gptResponse) {
      setBizGlobalUnderstanding(extractJsonFromText(gptResponse));
    }
  }, [gptResponse]);

  return (
    <>
      <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
        {isLoading ? (
          <Spinner loadingText='Loading Project Overview...' className='mt-24'/>
        ) : (
          understandings[0].value &&
          understandings.map((item, index) => (
            <DisclosureItem item={item} key={`biz-global-${index}`} />
          ))
        )}

        {!bizGlobalUnderstanding && (
          <GptComponent
            queryType='P1_R1_projectAnalysisJson'
            onResponseReceived={handleResponse}
            onLoadingChange={handleLoadingChange}
          />
        )}
      </div>
    </>
  );
};

export default BizGlobalUnderstanding;
