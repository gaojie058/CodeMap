import React, { useEffect, useState } from 'react';
import Toolbar from '../toolbar';
import { AnalysisGraph } from '../graph';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import useStore from '@/store/store';

/**
 * Renders the `Function Call` section of Code Mapper
 * The rendered UI element containing the section's title, graph visualization, and toolbar.
 */
const FunctionCall: React.FC = () => {
  const { isToolbarOpen, toggleToolbar } = useToolbarStore();
  const { fnCallDOT, setFnCallDOT } = useStore();

  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const handleResponse = (response: string | null) => {
    setGptResponse(response);
  };

  useEffect(() => {
    if (gptResponse) {
      const dotFromGPT = extractDotContent(gptResponse);
      setFnCallDOT(dotFromGPT);
    }
  }, [gptResponse]);

  return (
    <>
      <div className='font-semibold h1'>Function Call</div>

      <div className='w-full h-screen overflow-hidden'>
        {fnCallDOT && <AnalysisGraph dotData={fnCallDOT} />}
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
        />
      )}
    </>
  );
};

export default FunctionCall;
