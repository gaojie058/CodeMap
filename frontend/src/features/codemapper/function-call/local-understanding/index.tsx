import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import { AnalysisGraph, LocalGraph } from '../../graph';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { BaseDialog } from '@/components/Elements/Dialog/BaseDialog';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import DisclosureSection from '@/components/DisclosureSection/DisclosureSection';

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

  const {
    fnCallLocalDOT,
    setFnCallLocalDOT,
    fnCallLocalHighlightFlow,
    setFnCallLocalHighlightFlow,
    fnCallLocalRelevantFlow,
    setFnCallLocalRelevantFlow,
  } = useStore();

  const { fnCallSelectedNode, setFnCallSelectedNode } = useStore((state) => ({
    fnCallSelectedNode: state.fnCallSelectedNode,
    setFnCallSelectedNode: state.setFnCallSelectedNode,
  }));

  // gpt responses
  const [gptResFnCallLocalGraph, setGptResFnCallLocalGraph] = useState<string | null>(null);
  const [gptResHighlightedFnCallFlow, setGptResHighlightedFnCallFlow] = useState<any>(null);
  const [gptResRelevantFnCallFlow, setGptResRelevantFnCallFlow] = useState<any>(null);

  // loading states
  const [isLocalmapLoading, setIsLocalmapLoading] = useState<boolean>(false);
  const [isHighlightedExpLoading, setIsHighlightedExpLoading] = useState<boolean>(false);
  const [isRelevantExpLoading, setIsRelevantExpLoading] = useState<boolean>(false);

  // gpt response handlers
  const handleResFnCallLocalGraph = (res: string | null) => setGptResFnCallLocalGraph(res);
  const handleResHighlightedFnCallFlow = (res: string | null) => {
    const jsonData = extractJsonFromText(res);
    setGptResHighlightedFnCallFlow(jsonData?.highlightedInheritance || null);
  };
  const handleResRelevantFnCallFlow = (res: string | null) => {
    const jsonData = extractJsonFromText(res);
    setGptResRelevantFnCallFlow(jsonData?.relevantInheritance || null);
  };

    // gpt loading status handlers
    const handleLocalMapLoadingChange = (loading: boolean) => setIsLocalmapLoading(loading);
    const handleHighlightedExpLoadingChange = (loading: boolean) => setIsHighlightedExpLoading(loading);
    const handleRelevantExpLoadingChange = (loading: boolean) => setIsRelevantExpLoading(loading);

    const [localSelectedNode, setLocalSelectedNode] = useState<any>(fnCallSelectedNode);

  // update global store
  useEffect(() => {
    const updateStates = () => {
      if (gptResFnCallLocalGraph) {
        console.debug('gptResFnCallLocalGraph', gptResFnCallLocalGraph);
        setFnCallLocalDOT(extractDotContent(gptResFnCallLocalGraph));
      }

      if (gptResHighlightedFnCallFlow) {
        setFnCallLocalHighlightFlow(gptResHighlightedFnCallFlow);
      }

      if (gptResRelevantFnCallFlow) {
        setFnCallLocalRelevantFlow(gptResRelevantFnCallFlow);
      }
    };
    updateStates();
  }, [
    gptResFnCallLocalGraph,
    gptResHighlightedFnCallFlow,
    gptResRelevantFnCallFlow,
  ]);

  useEffect(() => {
    if (fnCallSelectedNode) {
      setIsHighlightedExpOpen(true);
      setIsRelevantExpOpen(true);

      if (fnCallSelectedNode !== localSelectedNode) {
        setFnCallLocalDOT(null);
        setFnCallLocalHighlightFlow(null);
        setFnCallLocalRelevantFlow(null);
        setLocalSelectedNode(fnCallSelectedNode);
      }
    }
  }, [fnCallSelectedNode, localSelectedNode]);

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
          onRegenerate={() => setFnCallLocalDOT(null)}
          isLoading={isLocalmapLoading}
        />

        <div className='my-2 flex flex-col gap-4'>
          <DisclosureSection
            title='Explain the highlighted inheritance flow'
            isOpen={isHighlightedExpOpen}
            disabled={!fnCallSelectedNode}
            isLoading={isHighlightedExpLoading}
            onToggle={() => setIsHighlightedExpOpen(!isHighlightedExpOpen)}
            onRegenerate={() => setFnCallLocalHighlightFlow(null)}
            content={renderDisclosureItems(fnCallLocalHighlightFlow)}
          />

          <DisclosureSection
            title='Relevant inheritance flow'
            isOpen={isRelevantExpOpen}
            disabled={!fnCallSelectedNode}
            isLoading={isRelevantExpLoading}
            onToggle={() => setIsRelevantExpOpen(!isRelevantExpOpen)}
            onRegenerate={() => setFnCallLocalRelevantFlow(null)}
            content={renderDisclosureItems(fnCallLocalRelevantFlow)}
          />
        </div>

        {fnCallSelectedNode && !fnCallLocalDOT && (
          <GptComponent
            queryType='P9_R9_functionCallFlow'
            params={{ selectedNode: fnCallSelectedNode }}
            onResponseReceived={handleResFnCallLocalGraph}
            onLoadingChange={handleLocalMapLoadingChange}
          />
        )}

        {fnCallSelectedNode && !fnCallLocalHighlightFlow && (
          <GptComponent
            queryType='P8_R8_functionCallLocalDesc'
            params={{ selectedNode: fnCallSelectedNode }}
            onResponseReceived={handleResHighlightedFnCallFlow}
            onLoadingChange={handleHighlightedExpLoadingChange}
          />
        )}

        {fnCallSelectedNode && !fnCallLocalRelevantFlow && (
          <GptComponent
            queryType='P10_R10_functionCallLocalExplain'
            params={{ selectedNode: fnCallSelectedNode }}
            onResponseReceived={handleResRelevantFnCallFlow}
            onLoadingChange={handleRelevantExpLoadingChange}
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
