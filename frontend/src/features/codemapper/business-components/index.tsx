import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Toolbar from '../toolbar';
import useStore from '@/store/store';
import { AnalysisGraph } from '../graph';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';

const BusinessComponents: React.FC = () => {
  const { bizCompDOT, setBizCompDOT } = useStore();
  const { isToolbarOpen, toggleToolbar } = useToolbarStore();

  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const handleResponse = useCallback((res: string | null) => setGptResponse(res), []);

  const dotFromGPT = useMemo(() => {
    if (gptResponse) {
      return extractDotContent(gptResponse);
    }
    return null;
  }, [gptResponse]);

  useEffect(() => {
    if (dotFromGPT) {
      setBizCompDOT(dotFromGPT);
    }
  }, [dotFromGPT, setBizCompDOT]);

  const gptComponentMemo = useMemo(() => {
    if (!bizCompDOT) {
      return (
        <GptComponent
          queryType='P2_R2_systemStructureDot'
          onResponseReceived={handleResponse}
        />
      );
    }
    return null;
  }, [bizCompDOT, handleResponse]);

  return (
    <>
      <div className='font-semibold h1'>Business Components</div>

      {bizCompDOT && <AnalysisGraph dotData={bizCompDOT} />}

      <Toolbar isOpen={isToolbarOpen} onClose={toggleToolbar} type='BUSINESS' />

      {gptComponentMemo}
    </>
  );
};

export default React.memo(BusinessComponents);