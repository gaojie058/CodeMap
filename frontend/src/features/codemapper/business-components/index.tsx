import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import Toolbar from '../toolbar';
import useStore from '@/store/store';
import { AnalysisGraph } from '../graph';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import Spinner from '@/components/Elements/Spinner/Spinner';
import Button from '@/components/Elements/Button/Button';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const BusinessComponents: React.FC = () => {
  const { bizCompDOT, setBizCompDOT } = useStore();
  const { isToolbarOpen, toggleToolbar } = useToolbarStore();

  const [gptResponse, setGptResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const handleResponse = useCallback(
  //   (res: string | null) => setGptResponse(res),
  //   []
  // );
  // const handleLoadingChange = (loading: boolean) => setIsLoading(loading);

  // const dotFromGPT = useMemo(() => {
  //   if (gptResponse) {
  //     return extractDotContent(gptResponse);
  //   }
  //   return null;
  // }, [gptResponse]);

  // useEffect(() => {
  //   if (dotFromGPT) {
  //     setBizCompDOT(dotFromGPT);
  //   }
  // }, [dotFromGPT, setBizCompDOT]);

  // const gptComponentMemo = useMemo(() => {
  //   if (!bizCompDOT) {
  //     return (
  //       <GptComponent
  //         queryType='P2_R2_systemStructureDot'
  //         onResponseReceived={handleResponse}
  //         onLoadingChange={handleLoadingChange}
  //       />
  //     );
  //   }
  //   return null;
  // }, [bizCompDOT, handleResponse]);

  const handleResponse = (response: string | null) => {
    setGptResponse(response);
  };

  const handleLoadingChange = (loading: boolean) => setIsLoading(loading);

  useEffect(() => {
    if (gptResponse) {
      const dotFromGPT = extractDotContent(gptResponse);
      setBizCompDOT(dotFromGPT);
    }
  }, [gptResponse]);

  return (
    <>
      {isLoading ? (
        <div className='my-48'>
          <Spinner loadingText='Loading Global Map of the Codebase' />
        </div>
      ) : (
        bizCompDOT && (
          <div className='w-full h-screen overflow-hidden'>
            <AnalysisGraph
              dotData={bizCompDOT}
              understanding='businesscomponent'
            />
            <div className='absolute left-8 bottom-28'>
              <Button
                variant='black'
                onClick={() => setBizCompDOT(null)}
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

      <Toolbar isOpen={isToolbarOpen} onClose={toggleToolbar} type='BUSINESS' />

      {/* {gptComponentMemo} */}
      {!bizCompDOT && (
        <GptComponent
          queryType='P2_R2_systemStructureDot'
          onResponseReceived={handleResponse}
          onLoadingChange={handleLoadingChange}
        />
      )}
    </>
  );
};

export default React.memo(BusinessComponents);
