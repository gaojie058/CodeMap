import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import useToolbarStore from '@/store/toolbarStore';
import { extractDotContent } from '@/utils/extractdot';
import { AnalysisGraph, LocalGraph } from '../../graph';
import { BaseDialog } from '@/components/Elements/Dialog/BaseDialog';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import DisclosureSection from '@/components/DisclosureSection/DisclosureSection';

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
  const {
    bizCompLocalDOT,
    bizCompLocalHighlightFlow,
    bizCompLocalRelevantFlow,
    setBizCompLocalDOT,
    setBizCompLocalHighlightFlow,
    setBizCompLocalRelevantFlow,
  } = useStore();

  const { bizCompSelectedNode, setBizCompSelectedNode } = useStore((state) => ({
    bizCompSelectedNode: state.bizCompSelectedNode,
    setBizCompSelectedNode: state.setBizCompSelectedNode,
  }));

  // gpt responses
  const [gptResponseBizLocalGraph, setGptResponseBizLocalGraph] = useState<string | null>(null);
  const [gptResHighlightedBizFlow, setGptResHighlightedBizFlow] = useState<any>(null);
  const [gptResRelevantBizFlow, setGptResRelevantBizFlow] = useState<any>(null);

  // loading states
  const [isLocalmapLoading, setIsLocalmapLoading] = useState<boolean>(false);
  const [isHighlightedExpLoading, setIsHighlightedExpLoading] = useState<boolean>(false);
  const [isRelevantExpLoading, setIsRelevantExpLoading] = useState<boolean>(false);

  // gpt response handlers
  const handleResBizLocalGraph = (res: string | null) => setGptResponseBizLocalGraph(res);
  const handleResHighlightedBizFlow = (res: string | null) => setGptResHighlightedBizFlow(parseJsonResponse(res));
  const handleResRelevantBizFlow = (res: string | null) => setGptResRelevantBizFlow(parseJsonResponse(res));

  // gpt loading status handlers
  const handleLocalMapLoadingChange = (loading: boolean) => setIsLocalmapLoading(loading);
  const handleHighlightedExpLoadingChange = (loading: boolean) => setIsHighlightedExpLoading(loading);
  const handleRelevantExpLoadingChange = (loading: boolean) => setIsRelevantExpLoading(loading);

  const [localSelectedNode, setLocalSelectedNode] = useState<any>(bizCompSelectedNode);

  // update global store
  useEffect(() => {
    const updateStates = () => {
      if (gptResponseBizLocalGraph) {
        setBizCompLocalDOT(extractDotContent(gptResponseBizLocalGraph));
      }

      if (gptResHighlightedBizFlow) {
        setBizCompLocalHighlightFlow(gptResHighlightedBizFlow);
      }

      if (gptResRelevantBizFlow) {
        setBizCompLocalRelevantFlow(gptResRelevantBizFlow);
      }
    };
    updateStates();
  }, [
    gptResponseBizLocalGraph,
    gptResHighlightedBizFlow,
    gptResRelevantBizFlow,
  ]);

  useEffect(() => {
    if (bizCompSelectedNode) {
      setIsHighlightedExpOpen(true);
      setIsRelevantExpOpen(true);
    }
  }, [bizCompSelectedNode]);

  useEffect(() => {
    if (bizCompSelectedNode) {
      setIsHighlightedExpOpen(true);
      setIsRelevantExpOpen(true);

      if (bizCompSelectedNode !== localSelectedNode) {
        setBizCompLocalDOT(null);
        setBizCompLocalHighlightFlow(null);
        setBizCompLocalRelevantFlow(null);
        setLocalSelectedNode(bizCompSelectedNode);
      }
    }
  }, [bizCompSelectedNode, localSelectedNode]);

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
            onRegenerate={() => setBizCompLocalDOT(null)}
            isLoading={isLocalmapLoading}
          />

          <div className='my-2 flex flex-col gap-4'>
            <DisclosureSection
              title='Explain the highlighted business flow'
              isOpen={isHighlightedExpOpen}
              disabled={!bizCompSelectedNode}
              isLoading={isHighlightedExpLoading}
              onToggle={() => setIsHighlightedExpOpen(!isHighlightedExpOpen)}
              onRegenerate={() => setBizCompLocalHighlightFlow(null)}
              content={renderDisclosureItems(bizCompLocalHighlightFlow)}
            />

            <DisclosureSection
              title='Relevant business flow'
              isOpen={isRelevantExpOpen}
              disabled={!bizCompSelectedNode}
              isLoading={isRelevantExpLoading}
              onToggle={() => setIsRelevantExpOpen(!isRelevantExpOpen)}
              onRegenerate={() => setBizCompLocalRelevantFlow(null)}
              content={renderDisclosureItems(bizCompLocalRelevantFlow)}
            />
          </div>

          {bizCompSelectedNode && !bizCompLocalDOT && (
            <GptComponent
              queryType='P3_R3_businessLocalGraph'
              params={{ selectedNode: bizCompSelectedNode }}
              onResponseReceived={handleResBizLocalGraph}
              onLoadingChange={handleLocalMapLoadingChange}
            />
          )}

          {bizCompSelectedNode && !bizCompLocalHighlightFlow && (
            <GptComponent
              queryType='P4_R4_businessFlowAnalysis'
              params={{ highlightedBusinessFlow: bizCompSelectedNode }}
              onResponseReceived={handleResHighlightedBizFlow}
              onLoadingChange={handleHighlightedExpLoadingChange}
            />
          )}

          {bizCompSelectedNode && !bizCompLocalRelevantFlow && (
            <GptComponent
              queryType='P5_R5_componentRelationAnalysis'
              params={{ relatedComponent: bizCompSelectedNode }}
              onResponseReceived={handleResRelevantBizFlow}
              onLoadingChange={handleRelevantExpLoadingChange}
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
