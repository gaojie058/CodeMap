import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Toolbar from '../toolbar';
import useStore from '@/store/store';
import { AnalysisGraph } from '../graph';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import Spinner from '@/components/Elements/Spinner/Spinner';

const BusinessComponents: React.FC = () => {
  const { bizCompDOT, setBizCompDOT } = useStore();
  const { isToolbarOpen, toggleToolbar } = useToolbarStore();

  const [gptResponse, setGptResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResponse = useCallback((res: string | null) => setGptResponse(res), []);
  const handleLoadingChange = (loading: boolean) => setIsLoading(loading);
  
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
          onLoadingChange={handleLoadingChange}
        />
      );
    }
    return null;
  }, [bizCompDOT, handleResponse]);

  return (
    <>
      {isLoading ? (
        <Spinner loadingText='Loading Global Map of the Codebase' />
      ) : (
        bizCompDOT && <div className='w-full h-screen overflow-hidden'><AnalysisGraph dotData={bizCompDOT} understanding='businesscomponent' /></div>
      )}

      <Toolbar isOpen={isToolbarOpen} onClose={toggleToolbar} type='BUSINESS' />

      {gptComponentMemo}
    </>
  );
};

export default React.memo(BusinessComponents);
