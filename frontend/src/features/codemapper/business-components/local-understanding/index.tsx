import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import { AnalysisGraph, LocalGraph } from '../../graph';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { BaseDialog } from '@/components/Elements/Dialog/BaseDialog';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';

function parseJsonResponse(response: string | null) {
  if (!response) return null;
  try {
    // 尝试提取 ```json ``` 标记中的内容
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : response;
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    return null;
  }
}

const BizLocalUnderstanding: React.FC = () => {
  const [isMiniGraphOpen, setIsMiniGraphOpen] = useState<boolean>(false);
  const [isHighlightedExpOpen, setIsHighlightedExpOpen] = useState<boolean>(false);
  const [isRelevantExpOpen, setIsRelevantExpOpen] = useState<boolean>(false);

  const { selectedNode } = useToolbarStore();
  const { bizCompLocalDOT, setBizCompLocalDOT } = useStore();

  const [gptResponseBizLocalGraph, setGptResponseBizLocalGraph] = useState<string | null>(null);
  const [gptResHighlightedBizFlow, setGptResHighlightedBizFlow] = useState<any>(null);
  const [gptResRelevantBizFlow, setGptResRelevantBizFlow] = useState<any>(null);

  const handleResBizLocalGraph = (res: string | null) => setGptResponseBizLocalGraph(res);
  const handleResHighlightedBizFlow = (res: string | null) => setGptResHighlightedBizFlow(parseJsonResponse(res));
  const handleResRelevantBizFlow = (res: string | null) => setGptResRelevantBizFlow(parseJsonResponse(res));

  useEffect(() => {
    if (gptResponseBizLocalGraph) setBizCompLocalDOT(extractDotContent(gptResponseBizLocalGraph));
  }, [gptResponseBizLocalGraph]);

  const renderDisclosureItems = (data: any) => {
    if (!data) return null;
    return Object.entries(data).map(([key, value], index) => (
      <DisclosureItem
        key={index}
        item={{
          name: key,
          key: key,
          value: typeof value === 'object' ? JSON.stringify(value, null, 2) : value as string
        }}
      />
    ));
  };

  return (
    <>
      <div className='h-screen w-full'>
        <div className='mx-auto w-full max-w-lg flex flex-col gap-4 rounded-xl'>
          <LocalGraph
            dot={bizCompLocalDOT}
            onExpand={() => setIsMiniGraphOpen(true)}
            onRegenerate={() => {}}
          />

          <div className='my-2 flex flex-col gap-4'>
            <div>
              <button
                type='button'
                onClick={() => setIsHighlightedExpOpen(!isHighlightedExpOpen)}
                className='w-full px-6 py-2.5 border border-zinc-200 rounded-lg flex justify-between items-center font-medium text-sm'
              >
                Explain the highlighted business flow
                <ChevronDownIcon
                  className={`size-4 fill-white/60 ${
                    isHighlightedExpOpen ? 'rotate-180' : 'group-data-[hover]:fill-white/50'
                  }`}
                />
              </button>
              <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
                {isHighlightedExpOpen && renderDisclosureItems(gptResHighlightedBizFlow)}
              </div>
            </div>
            <div>
              <button
                type='button'
                onClick={() => setIsRelevantExpOpen(!isRelevantExpOpen)}
                className='w-full px-6 py-2.5 border border-zinc-200 rounded-lg flex justify-between items-center font-medium text-sm'
              >
                Relevant business flow
                <ChevronDownIcon
                  className={`size-4 fill-white/60 ${
                    isRelevantExpOpen ? 'rotate-180' : 'group-data-[hover]:fill-white/50'
                  }`}
                />
              </button>
              <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
                {isRelevantExpOpen && renderDisclosureItems(gptResRelevantBizFlow)}
              </div>
            </div>
          </div>

          {selectedNode && !bizCompLocalDOT && (
            <GptComponent
              queryType='P3_R3_businessLocalGraph'
              params={{ selectedNode }}
              onResponseReceived={handleResBizLocalGraph}
            />
          )}

          {selectedNode && !gptResHighlightedBizFlow && (
            <GptComponent
              queryType='P4_R4_businessFlowAnalysis'
              params={{ selectedNode }}
              onResponseReceived={handleResHighlightedBizFlow}
            />
          )}

          {selectedNode && !gptResRelevantBizFlow && (
            <GptComponent
              queryType='P5_R5_componentRelationAnalysis'
              params={{ selectedNode }}
              onResponseReceived={handleResRelevantBizFlow}
            />
          )}
        </div>
      </div>

      <BaseDialog
        isOpen={isMiniGraphOpen}
        onClose={() => setIsMiniGraphOpen(!isMiniGraphOpen)}
      >
        <AnalysisGraph dotData={bizCompLocalDOT} />
      </BaseDialog>
    </>
  );
};

export default BizLocalUnderstanding;