import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import { AnalysisGraph, LocalGraph } from '../../graph';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { BaseDialog } from '@/components/Elements/Dialog/BaseDialog';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';

function extractJsonFromText(responseText: string) {
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  }
  console.error('No valid JSON found in the response');
  return null;
}

const FnLocalUnderstanding: React.FC = () => {
  const [isMiniGraphOpen, setIsMiniGraphOpen] = useState<boolean>(false);
  const [isHighlightedExpOpen, setIsHighlightedExpOpen] = useState<boolean>(false);
  const [isRelevantExpOpen, setIsRelevantExpOpen] = useState<boolean>(false);

  const { selectedNode } = useToolbarStore();
  const { fnCallLocalDOT, setFnCallLocalDOT } = useStore();

  const [gptResFnCallLocalGraph, setGptResFnCallLocalGraph] = useState<string | null>(null);
  const [gptResHighlightedFnCallFlow, setGptResHighlightedFnCallFlow] = useState<any>(null);
  const [gptResRelevantFnCallFlow, setGptResRelevantFnCallFlow] = useState<any>(null);

  const handleResFnCallLocalGraph = (res: string | null) => setGptResFnCallLocalGraph(res);
  const handleResHighlightedFnCallFlow = (res: string | null) => {
    const jsonData = extractJsonFromText(res);
    setGptResHighlightedFnCallFlow(jsonData?.highlightedInheritance || null);
  };
  const handleResRelevantFnCallFlow = (res: string | null) => {
    const jsonData = extractJsonFromText(res);
    setGptResRelevantFnCallFlow(jsonData?.relevantInheritance || null);
  };

  useEffect(() => {
    if (gptResFnCallLocalGraph) {
      setFnCallLocalDOT(extractDotContent(gptResFnCallLocalGraph));
    }
  }, [gptResFnCallLocalGraph]);

  const renderDisclosureItems = (items: any[]) => {
    if (!items) return null;
    return items.map((item, index) => (
      <DisclosureItem
        key={index}
        item={{
          name: item.name,
          key: item.key,
          value: typeof item.value === 'object' 
            ? JSON.stringify(item.value, null, 2) 
            : item.value || 'No data available'
        }}
      />
    ));
  };

  return (
    <>
      <div className='mx-auto w-full max-w-lg flex flex-col gap-4 rounded-xl'>
        <LocalGraph
          dot={fnCallLocalDOT}
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
              Explain the highlighted inheritance flow
              <ChevronDownIcon
                className={`size-4 fill-white/60 ${
                  isHighlightedExpOpen ? 'rotate-180' : 'group-data-[hover]:fill-white/50'
                }`}
              />
            </button>
            <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
              {isHighlightedExpOpen && renderDisclosureItems(gptResHighlightedFnCallFlow)}
            </div>
          </div>
          <div>
            <button
              type='button'
              onClick={() => setIsRelevantExpOpen(!isRelevantExpOpen)}
              className='w-full px-6 py-2.5 border border-zinc-200 rounded-lg flex justify-between items-center font-medium text-sm'
            >
              Relevant inheritance flow
              <ChevronDownIcon
                className={`size-4 fill-white/60 ${
                  isRelevantExpOpen ? 'rotate-180' : 'group-data-[hover]:fill-white/50'
                }`}
              />
            </button>
            <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
              {isRelevantExpOpen && renderDisclosureItems(gptResRelevantFnCallFlow)}
            </div>
          </div>
        </div>

        {selectedNode && !fnCallLocalDOT && (
          <GptComponent
            queryType='P9_R9_functionCallFlow'
            params={{ selectedNode }}
            onResponseReceived={handleResFnCallLocalGraph}
          />
        )}

        {selectedNode && !gptResHighlightedFnCallFlow && (
          <GptComponent
            queryType='P8_R8_functionCallLocalDesc'
            params={{ selectedNode }}
            onResponseReceived={handleResHighlightedFnCallFlow}
          />
        )}

        {selectedNode && !gptResRelevantFnCallFlow && (
          <GptComponent
            queryType='P10_R10_functionCallLocalExplain'
            params={{ selectedNode }}
            onResponseReceived={handleResRelevantFnCallFlow}
          />
        )}
      </div>

      <BaseDialog
        isOpen={isMiniGraphOpen}
        onClose={() => setIsMiniGraphOpen(!isMiniGraphOpen)}
      >
        <AnalysisGraph dotData={fnCallLocalDOT} />
      </BaseDialog>
    </>
  );
};

export default FnLocalUnderstanding;