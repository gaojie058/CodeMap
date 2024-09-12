import React, { useCallback, useEffect, useState } from 'react';
import Toolbar from '../toolbar';
import useStore from '@/store/store';
import { AnalysisGraph } from '../graph';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import Button from '@/components/Elements/Button/Button';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Spinner from '@/components/Elements/Spinner/Spinner';
import { extractDotContent, extractJsonFromText } from '@/utils/extract';

const BusinessComponents: React.FC = () => {
  const { bizDot, isBizLoading, setbizDot, setBizGlobal, setIsBizLoading } = useStore();
  const { isToolbarOpen, toggleToolbar } = useToolbarStore();

  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleResponseReceived = useCallback(
    (receivedResponse: string | null, receivedError?: string | null) => {
      if (receivedResponse) {
        const jsonResponse = extractJsonFromText(receivedResponse);
        const dotResponse = extractDotContent(receivedResponse);
        setResponse(dotResponse);
        setbizDot(dotResponse);
        setBizGlobal(jsonResponse);
      } else {
        setResponse(null);
      }
      if (receivedError) setError(receivedError);
    },
    []
  );

  const handleLoadingChange = useCallback((isLoading: boolean) => {
    setIsBizLoading(isLoading);
  }, []);

  useEffect(() => {
    if (bizDot && !response) {
      setResponse(bizDot);
      setIsBizLoading(false);
    }
  }, [bizDot, response]);

  return (
    <>
      {isBizLoading &&  <div className='my-48'><Spinner loadingText='Loading Global Map of the Codebase' /></div>}
      {error && <div>Error: {error}</div>}
      {response && !isBizLoading && !error && (
        <div>
          <div className='w-full h-screen overflow-hidden'>
            <AnalysisGraph dotData={response} understanding='businesscomponent' />
            <div className='absolute left-8 bottom-28'>
              <Button
                variant='black'
                onClick={() => setbizDot(null)}
                startIcon={<ArrowPathIcon />}
              >
                Regenerate this graph
              </Button>
              <span className='text-gray-700 text-xs'>
                Drag or zoom out/in to check details.
              </span>
            </div>
          </div>
        </div>
      )}
      <Toolbar isOpen={isToolbarOpen} onClose={toggleToolbar} type='BUSINESS' />
      {!bizDot && !isBizLoading && !error && (
        <GptComponent
          queryType='P2_R2_systemStructureDot'
          onResponseReceived={handleResponseReceived}
          onLoadingChange={handleLoadingChange}
        />
      )}
    </>
  );
};

export default BusinessComponents;
