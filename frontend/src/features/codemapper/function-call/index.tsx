import React, { useEffect, useState } from 'react';
import Toolbar from '../toolbar';
import { AnalysisGraph } from '../graph';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import useStore from '@/store/store';
import Spinner from '@/components/Elements/Spinner/Spinner';
import Button from '@/components/Elements/Button/Button';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * Renders the `Function Call` section of Code Mapper
 * The rendered UI element containing the section's title, graph visualization, and toolbar.
 */
const FunctionCall: React.FC = () => {
  const { isToolbarOpen, toggleToolbar } = useToolbarStore();
  const { fnCallDOT, setFnCallDOT } = useStore();

  const [gptResponse, setGptResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResponse = (response: string | null) => {
    setGptResponse(response);
  };

  const handleLoadingChange = (loading: boolean) => setIsLoading(loading);

  useEffect(() => {
    if (gptResponse) {
      const dotFromGPT = extractDotContent(gptResponse);
      setFnCallDOT(dotFromGPT);
    }
  }, [gptResponse]);

  return (
    <>
      {isLoading ? (
        <div className='my-48'>
          <Spinner loadingText='Loading Global Map of the Codebase' />
        </div>
      ) : (
        fnCallDOT && (
          <div className='w-full h-screen overflow-hidden relative'>
            <AnalysisGraph dotData={fnCallDOT} understanding='functioncall' />
            <div className='absolute left-8 bottom-28'>
              <Button
                variant='black'
                onClick={() => setFnCallDOT(null)}
                startIcon={<ArrowPathIcon />}
              >
                Regenerate this graph
              </Button>
              <span className='text-gray-700 text-xs'>
                Drag or zoom out/in to check details.
              </span>
            </div>
          </div>
        )
      )}

      <Toolbar
        isOpen={isToolbarOpen}
        onClose={toggleToolbar}
        type='FUNCTION_CALL'
      />

      {!fnCallDOT && (
        <GptComponent
          // queryType='projectOverview'
          queryType='P6_R6_inheritanceGraph'
          onResponseReceived={handleResponse}
          onLoadingChange={handleLoadingChange}
        />
      )}
    </>
  );
};

export default FunctionCall;
