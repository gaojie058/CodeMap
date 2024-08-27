import React, { useEffect, useState } from 'react';
import Toolbar from '../toolbar';
import useStore from '@/store/store';
import { AnalysisGraph } from '../graph';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';

/**
 * Renders the `Business Components` section of Code Mapper
 * The rendered UI element containing the section's title, graph visualization, and toolbar.
 */
const BusinessComponents: React.FC = () => {
  const { bizCompDOT, setBizCompDOT } = useStore();
  const { isToolbarOpen, toggleToolbar } = useToolbarStore();

  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const handleResponse = (res: string | null) => setGptResponse(res);

  useEffect(() => {
    if (gptResponse) {
      const dotFromGPT = extractDotContent(gptResponse);
      setBizCompDOT(dotFromGPT);
    }
  }, [gptResponse]);

  return (
    <>
      <div className='font-semibold h1'>Business Components</div>

      {bizCompDOT && <AnalysisGraph dotData={bizCompDOT} />}

      <Toolbar isOpen={isToolbarOpen} onClose={toggleToolbar} type='BUSINESS' />

      {!bizCompDOT && (
        <GptComponent
          queryType='systemStructureDot'
          onResponseReceived={handleResponse}
        />
      )}
    </>
  );
};

export default BusinessComponents;
