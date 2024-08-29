import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import { AnalysisGraph, LocalGraph } from '../../graph';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { BaseDialog } from '@/components/Elements/Dialog/BaseDialog';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';

// defines `understandings` that will be rendered as collapsible items
// TODO: add data from `GptComponent`
const highlightedBusinessFlow = [
  {
    name: 'Business Flow Overview',
    key:'',
    value:'',
  },
  {
    name: 'Role of the Highlighted Business Flow in the Overall Framework',
    key:'',
    value:'',
  },
  {
    name: 'Roles of Each Component Under This Business Flow',
    key:'',
    value:'',
  },
];

const relevantBusinessFlow = [
  {
    name: 'Business Flow Overview',
    key:'',
    value:'',
  },
  {
    name: 'Role of the Highlighted Business Flow in the Overall Framework',
    key:'',
    value:'',
  },
  {
    name: 'Roles of Each Component Under This Business Flow',
    key:'',
    value:'',
  },
];

/**
 * Renders `Local Understanding` section of `Business Components` page.
 * This component is used within the `Toolbar` to display a list of items with collapsible details.
 */
const BizLocalUnderstanding: React.FC = () => {
  // dummy graph setup
  const [isMiniGraphOpen, setIsMiniGraphOpen] = useState<boolean>(false);

  //dummy disclosure setup
  const [isHighlightedExpOpen, setIsHighlightedExpOpen] =
    useState<boolean>(false);
  const [isRelevantExpOpen, setIsRelevantExpOpen] = useState<boolean>(false);

  const { selectedNode } = useToolbarStore();

  const [gptResponseBizLocalGraph, setGptResponseBizLocalGraph] = useState<string | null>(null);
  const [gptResHighlightedBizFlow, setGptResHighlightedBizFlow] = useState<string | null>(null);
  const [gptResRelevantBizFlow, setGptResRelevantBizFlow] = useState<string | null>(null);

  const handleResBizLocalGraph = (res: string | null) => setGptResponseBizLocalGraph(res);
  const handleResHighlightedBizFlow = (res: string | null) => setGptResHighlightedBizFlow(res);
  const handleResRelevantBizFlow = (res: string | null) => setGptResRelevantBizFlow(res);


  const { bizCompLocalDOT, setBizCompLocalDOT } = useStore();

  useEffect(() => {
    if (gptResponseBizLocalGraph) setBizCompLocalDOT(extractDotContent(gptResponseBizLocalGraph));
  }, [gptResponseBizLocalGraph]);

  return (
    <>
      <div className='h-screen w-full'>
        <div className='mx-auto w-full max-w-lg flex flex-col gap-4 rounded-xl'>
          <LocalGraph
            dot={bizCompLocalDOT}
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
                Explain the highlighted business flow
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
                  relevantBusinessFlow.map((item, index) => (
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
                Relevant business flow
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
                  highlightedBusinessFlow.map((item, index) => (
                    <DisclosureItem item={item} key={index} />
                  ))}
              </div>
            </div>
          </div>

          {(selectedNode && !bizCompLocalDOT) && (
            <GptComponent
              queryType='P3_R3_businessLocalGraph'
              params={{ selectedNode }}
              onResponseReceived={handleResBizLocalGraph}
            />
          )}

          {/* {selectedNode && (
            <GptComponent
              queryType='P4_R4_businessFlowAnalysis'
              params={{ selectedNode }}
              onResponseReceived={handleResHighlightedBizFlow}
            />
          )}

          {selectedNode && (
            <GptComponent
              queryType='P5_R5_componentRelationAnalysis'
              params={{ selectedNode }}
              onResponseReceived={handleResRelevantBizFlow}
            />
          )} */}
        </div>
      </div>

      {/* Dialog that displays expanded `Mini Graph` in Local Understanding  */}
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
