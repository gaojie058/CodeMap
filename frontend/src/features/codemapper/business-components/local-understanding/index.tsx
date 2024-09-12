import React, { useCallback, useEffect, useState } from 'react';
import useStore from '@/store/store';
import { extractDotContent } from '@/utils/extract';
import { GptComponent } from '@gpt/GptComponent';
import { AnalysisGraph, LocalGraph } from '../../graph';
import { BaseDialog } from '@/components/Elements/Dialog/BaseDialog';
import DisclosureSection from '@/components/DisclosureSection/DisclosureSection';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';

function parseJsonResponse(response: string | null) {
  if (!response) return null;
  try {
    // Attempt to extract content within ```json``` tags
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : response;
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    return null;
  }
}

const renderDisclosureItems = (data: any) => {
  if (!data) return null;
  return Object.entries(data).map(([key, value], index) => (
    <DisclosureItem
      key={index}
      item={{
        name: key,
        key: key,
        value:
          typeof value === 'object'
            ? JSON.stringify(value, null, 2)
            : (value as string),
      }}
    />
  ));
};

interface GptResponses {
  graph: string | null;
  highlightFlow: any;
  relevantFlow: any;
}

const ResponseType = {
  graph: 'P3_R3_businessLocalGraph',
  highlightFlow: 'P4_R4_businessFlowAnalysis',
  relevantFlow: 'P5_R5_componentRelationAnalysis',
};

const BizLocalUnderstanding: React.FC = () => {
  const [isGraphOpen, setIsGraphOpen] = useState<boolean>(false);
  const [isHighlightedOpen, setIsHighlightedOpen] = useState<boolean>(false);
  const [isRelevantOpen, setIsRelevantOpen] = useState<boolean>(false);

  const {
    bizLocalDot,
    setBizLocalDot,
    isBizLocalLoading,
    setIsBizLocalLoading,
    bizLocalHighlight,
    setBizLocalHighlight,
    bizLocalRelevant,
    setBizLocalRelevant,
  } = useStore();

  const { bizSelectedNode } = useStore((state) => ({
    bizSelectedNode: state.bizSelectedNode
  }));

  const [prevSelectedNode, setPrevSelectedNode] = useState<any>(bizSelectedNode);

  const [responses, setResponses] = useState<GptResponses>({
    graph: null,
    highlightFlow: null,
    relevantFlow: null,
  });

  const resetResponses = () => {
    setResponses({
      graph: null,
      highlightFlow: null,
      relevantFlow: null,
    });
  }

  const resetStoreData = () => {
    setBizLocalDot(null);
    setBizLocalHighlight(null);
    setBizLocalRelevant(null);
  }

  const handleResponseReceived = useCallback(
    (
      receivedResponse: string | null,
      receivedError?: string | null,
      receivedType?: string
    ) => {
      if (receivedResponse) {
        switch (receivedType) {
          case ResponseType.graph:
            const dotResponse = extractDotContent(receivedResponse);
            setResponses((prev) => ({
              ...prev,
              graph: dotResponse,
            }));
            setBizLocalDot(dotResponse);
            break;

          case ResponseType.highlightFlow:
            const jsonResHighlight = parseJsonResponse(receivedResponse);
            setResponses((prev) => ({
              ...prev,
              highlightFlow: jsonResHighlight,
            }));
            setBizLocalHighlight(jsonResHighlight);
            break;

          case ResponseType.relevantFlow:
            const jsonResRelevant = parseJsonResponse(receivedResponse);
            setResponses((prev) => ({
              ...prev,
              relevantFlow: jsonResRelevant,
            }));
            setBizLocalRelevant(jsonResRelevant);
            break;
        }
      } else {
        resetResponses();
        if (receivedError) console.error(receivedError);
      }
    },
    []
  );

  const handleLoadingChange = useCallback((isLoading: boolean) => {
    setIsBizLocalLoading(isLoading);
  }, []);

  useEffect(() => {
    if (bizLocalDot && !responses.graph) {
      setResponses((prev) => ({ ...prev, graph: bizLocalDot }));
      setIsBizLocalLoading(false);
    }
  }, [bizLocalDot, responses]);

  useEffect(() => {
    if (bizLocalHighlight && !responses.highlightFlow) {
      setResponses((prev) => ({ ...prev, highlightFlow: bizLocalHighlight }));
      setIsBizLocalLoading(false);
    }
  }, [bizLocalHighlight, responses]);

  useEffect(() => {
    if (bizLocalRelevant && !responses.relevantFlow) {
      setResponses((prev) => ({ ...prev, relevantFlow: bizLocalRelevant }));
      setIsBizLocalLoading(false);
    }
  }, [bizLocalRelevant, responses]);

  useEffect(() => {
    if (bizSelectedNode) {
      setIsHighlightedOpen(true);
      setIsRelevantOpen(true);

      if (bizSelectedNode !== prevSelectedNode) {
        resetResponses();
        resetStoreData();
        setPrevSelectedNode(bizSelectedNode);
      }
    }
  }, [bizSelectedNode, prevSelectedNode]);

  return (
    <>
      <div className='h-screen w-full'>
        <div className='mx-auto w-full max-w-lg flex flex-col gap-4 rounded-xl'>
          <LocalGraph
            dot={bizLocalDot}
            onExpand={() => setIsGraphOpen(true)}
            onRegenerate={() => setBizLocalDot(null)}
            isLoading={bizLocalDot ? false : isBizLocalLoading}
          />

          <div className='my-2 flex flex-col gap-4'>
            <DisclosureSection
              title='Explain the highlighted Component and its Flow'
              isOpen={isHighlightedOpen}
              disabled={!bizSelectedNode}
              isLoading={bizLocalHighlight ? false : isBizLocalLoading}
              onToggle={() => setIsHighlightedOpen(!isHighlightedOpen)}
              onRegenerate={() => setBizLocalHighlight(null)}
              content={renderDisclosureItems(bizLocalHighlight)}
            />

            <DisclosureSection
              title='Relevant business flow'
              isOpen={isRelevantOpen}
              disabled={!bizSelectedNode}
              isLoading={bizLocalRelevant ? false : isBizLocalLoading}
              onToggle={() => setIsRelevantOpen(!isRelevantOpen)}
              onRegenerate={() => setBizLocalRelevant(null)}
              content={renderDisclosureItems(bizLocalRelevant)}
            />
          </div>
        </div>
      </div>

      {bizSelectedNode && !bizLocalDot && !isBizLocalLoading && (
        <GptComponent
          queryType='P3_R3_businessLocalGraph'
          params={{ selectedNode: bizSelectedNode }}
          onResponseReceived={handleResponseReceived}
          onLoadingChange={handleLoadingChange}
        />
      )}

      {bizSelectedNode && !bizLocalHighlight && !isBizLocalLoading && (
        <GptComponent
          queryType='P4_R4_businessFlowAnalysis'
          params={{ highlightedBusinessFlow: bizSelectedNode }}
          onResponseReceived={handleResponseReceived}
          onLoadingChange={handleLoadingChange}
        />
      )}

      {bizSelectedNode && !bizLocalRelevant && !isBizLocalLoading && (
        <GptComponent
          queryType='P5_R5_componentRelationAnalysis'
          params={{ relatedComponent: bizSelectedNode }}
          onResponseReceived={handleResponseReceived}
          onLoadingChange={handleLoadingChange}
        />
      )}

      <BaseDialog isOpen={isGraphOpen} onClose={() => setIsGraphOpen(!isGraphOpen)}>
        <AnalysisGraph dotData={bizLocalDot} />
      </BaseDialog>
    </>
  );
};

export default BizLocalUnderstanding;
