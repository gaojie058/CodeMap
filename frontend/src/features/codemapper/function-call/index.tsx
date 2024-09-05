import React, { useEffect, useState } from 'react';
import Toolbar from '../toolbar';
import { AnalysisGraph } from '../graph';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import useStore from '@/store/store';
import Spinner from '@/components/Elements/Spinner/Spinner';

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
      <div className='w-full h-screen overflow-hidden'>
        {isLoading ? (
          <Spinner loadingText='Loading Global Map of the Codebase' />
        ) : (
          fnCallDOT && <div className='w-full h-screen overflow-hidden'><AnalysisGraph dotData={fnCallDOT} understanding='functioncall' /></div>
        )}
      </div>

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
