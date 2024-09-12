import React, { useCallback, useEffect, useState } from 'react';
import Toolbar from '../toolbar';
import useStore from '@/store/store';
import { AnalysisGraph } from '../graph';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import Button from '@/components/Elements/Button/Button';
import Spinner from '@/components/Elements/Spinner/Spinner';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { extractDotContent, extractJsonFromText } from '@/utils/extract';

const FunctionCall: React.FC = () => {
  const { funcDot, isFuncLoading, setFuncDot, setFuncGlobal, setIsFuncLoading } = useStore();
  const { isToolbarOpen, toggleToolbar } = useToolbarStore();

  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleResponseReceived = useCallback(
    (receivedResponse: string | null, receivedError?: string | null) => {
      if (receivedResponse) {
        const jsonResponse = extractJsonFromText(receivedResponse);
        const dotResponse = extractDotContent(receivedResponse);
        setResponse(dotResponse);
        setFuncDot(dotResponse);
        setFuncGlobal(jsonResponse);
        setIsFuncLoading(false);
      } else {
        setResponse(null);
      }
      if (receivedError) setError(receivedError);
    },
    []
  );

  const handleLoadingChange = useCallback((isLoading: boolean) => {
    setIsFuncLoading(isLoading);
  }, []);

  useEffect(() => {
    if (funcDot && !response) {
      setResponse(funcDot);
      setIsFuncLoading(false);
    }
  }, [funcDot, response]);

  return (
    <>
      {isFuncLoading &&  <div className='my-48'><Spinner loadingText='Loading Global Map of the Codebase' /></div>}
      {error && <div>Error: {error}</div>}
      {response && !isFuncLoading && !error && (
        <div>
          <div className='w-full h-screen overflow-hidden'>
            <AnalysisGraph dotData={response} understanding='functioncall' />
            <div className='absolute left-8 bottom-28'>
              <Button
                variant='black'
                onClick={() => setFuncDot(null)}
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
      <Toolbar isOpen={isToolbarOpen} onClose={toggleToolbar} type='FUNCTION_CALL' />
      {!funcDot && !isFuncLoading && !error && (
        <GptComponent
          queryType='P7_R7_projectStructureJson'
          onResponseReceived={handleResponseReceived}
          onLoadingChange={handleLoadingChange}
        />
      )}
    </>
  );
};

export default FunctionCall;