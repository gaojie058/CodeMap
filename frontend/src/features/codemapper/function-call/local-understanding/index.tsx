import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import { AnalysisGraph, LocalGraph } from '../../graph';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { BaseDialog } from '@/components/Elements/Dialog/BaseDialog';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';

const highlightedInheritance = [
  {
    name: 'Inheritance Flow Overview',
  },
  {
    name: 'Role of the Inheritance Flow in the Overall Framework',
  },
  {
    name: 'Roles of Each function understand this Inheritance Flow',
  },
];

const relevantInheritance = [
  {
    name: 'Inheritance Flow Overview',
  },
  {
    name: 'Role of the Inheritance Flow in the Overall Framework',
  },
  {
    name: 'Roles of Each function understand this Inheritance Flow',
  },
];

/**
 * Renders `Local Understanding` section of `Function Call` page.
 * This component is used within the `Toolbar` to display a list of items with collapsible details.
 */
const FnLocalUnderstanding: React.FC = () => {
  // dummy graph setup
  const [isMiniGraphOpen, setIsMiniGraphOpen] = useState<boolean>(false);

  //dummy disclosure setup
  const [isHighlightedExpOpen, setIsHighlightedExpOpen] =
    useState<boolean>(false);
  const [isRelevantExpOpen, setIsRelevantExpOpen] = useState<boolean>(false);

  const { selectedNode } = useToolbarStore();

  const [gptResFnCallLocalGraph, setGptResFnCallLocalGraph] = useState<
    string | null
  >(null);
  const [gptResHighlightedFnCallFlow, setGptResHighlightedFnCallFlow] =
    useState<string | null>(null);
  const [gptResRelevantFnCallFlow, setGptResRelevantFnCallFlow] = useState<
    string | null
  >(null);

  const handleResFnCallLocalGraph = (res: string | null) =>
    setGptResFnCallLocalGraph(res);
  const handleResHighlightedFnCallFlow = (res: string | null) =>
    setGptResHighlightedFnCallFlow(res);
  const handleResRelevantFnCallFlow = (res: string | null) =>
    setGptResRelevantFnCallFlow(res);

  const { fnCallLocalDOT, setFnCallLocalDOT } = useStore();

  useEffect(() => {
    if (gptResFnCallLocalGraph) {
      setFnCallLocalDOT(extractDotContent(gptResFnCallLocalGraph));
      console.log(extractDotContent(gptResFnCallLocalGraph));
    }
  }, [gptResFnCallLocalGraph]);

  return (
    <>
      <div className='mx-auto w-full max-w-lg flex flex-col gap-4 rounded-xl'>
        <LocalGraph
          dot={fnCallLocalDOT}
          onExpand={() => setIsMiniGraphOpen(true)}
          onRegenerate={() => {}}
        />

        {/* 
            Collapsible Buttons in `Local Understanding` 
            TODO: Add `disabled` state, if content is empty
        */}
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
                  isHighlightedExpOpen
                    ? 'rotate-180'
                    : 'group-data-[hover]:fill-white/50'
                }`}
              />
            </button>
            <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
              {isHighlightedExpOpen &&
                relevantInheritance.map((item, index) => (
                  <DisclosureItem item={item} key={index} />
                ))}
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
                  isRelevantExpOpen
                    ? 'rotate-180'
                    : 'group-data-[hover]:fill-white/50'
                }`}
              />
            </button>
            <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
              {isRelevantExpOpen &&
                highlightedInheritance.map((item, index) => (
                  <DisclosureItem item={item} key={index} />
                ))}
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

        {selectedNode && (
          <GptComponent
            queryType='P8_R8_functionCallLocalDesc'
            params={{ selectedNode }}
            onResponseReceived={handleResHighlightedFnCallFlow}
          />
        )}

        {selectedNode && (
          <GptComponent
            queryType='P10_R10_functionCallLocalExplain'
            params={{ selectedNode }}
            onResponseReceived={handleResRelevantFnCallFlow}
          />
        )}
      </div>

      {/* Dialog that displays expanded `Mini Graph` in Local Understanding  */}
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