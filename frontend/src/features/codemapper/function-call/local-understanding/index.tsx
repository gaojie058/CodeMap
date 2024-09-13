import React, { useCallback, useEffect, useState } from 'react';
import useStore from '@/store/store';
import { GptComponent } from '@gpt/GptComponent';
import { extractDotContent } from '@/utils/extract';
import { AnalysisGraph, LocalGraph } from '../../graph';
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

interface GptResponses {
  graph: string | null;
  highlightFlow: any;
  relevantFlow: any;
}

const ResponseType = {
  graph: 'P9_R9_functionCallFlow',
  highlightFlow: 'P8_R8_functionCallLocalDesc',
  relevantFlow: 'P10_R10_functionCallLocalExplain',
};

const FnLocalUnderstanding: React.FC = () => {
  const [isGraphOpen, setIsGraphOpen] = useState<boolean>(false);
  const [isHighlightedOpen, setIsHighlightedOpen] = useState<boolean>(false);
  const [isRelevantOpen, setIsRelevantOpen] = useState<boolean>(false);

  const {
    funcLocalDot,
    setFuncLocalDot,
    funcLocalHighlight,
    setFuncLocalHighlight,
    funcLocalRelevant,
    setFuncLocalRelevant,
    isFuncLocalLoading,
    setIsFuncLocalLoading,
  } = useStore();

  const { funcSelectedNode } = useStore((state) => ({
    funcSelectedNode: state.funcSelectedNode,
  }));

  const [prevSelectedNode, setPrevSelectedNode] = useState<any>(funcSelectedNode);

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
  };

  const resetStoreData = () => {
    setFuncLocalDot(null);
    setFuncLocalHighlight(null);
    setFuncLocalRelevant(null);
  };

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
            setFuncLocalDot(dotResponse);
            break;

          case ResponseType.highlightFlow:
            const jsonResHighlight = extractJsonFromText(receivedResponse).highlightedInheritance;
            setResponses((prev) => ({
              ...prev,
              highlightFlow: jsonResHighlight,
            }));
            setFuncLocalHighlight(jsonResHighlight);
            break;

          case ResponseType.relevantFlow:
            const jsonResRelevant = extractJsonFromText(receivedResponse).relevantInheritance;
            setResponses((prev) => ({
              ...prev,
              relevantFlow: jsonResRelevant,
            }));
            setFuncLocalRelevant(jsonResRelevant);
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
    setIsFuncLocalLoading(isLoading);
  }, []);

  useEffect(() => {
    if (funcLocalDot && !responses.graph) {
      setResponses((prev) => ({ ...prev, graph: funcLocalDot }));
      setIsFuncLocalLoading(false);
    }
  }, [funcLocalDot, responses]);

  useEffect(() => {
    if (funcLocalHighlight && !responses.highlightFlow) {
      setResponses((prev) => ({ ...prev, highlightFlow: funcLocalHighlight }));
      setIsFuncLocalLoading(false);
    }
  }, [funcLocalHighlight, responses]);

  useEffect(() => {
    if (funcLocalRelevant && !responses.relevantFlow) {
      setResponses((prev) => ({ ...prev, relevantFlow: funcLocalRelevant }));
      setIsFuncLocalLoading(false);
    }
  }, [funcLocalRelevant, responses]);

  useEffect(() => {
    if (funcSelectedNode) {
      setIsHighlightedOpen(true);
      setIsRelevantOpen(true);

      if (funcSelectedNode !== prevSelectedNode) {
        resetResponses();
        resetStoreData();
        setPrevSelectedNode(funcSelectedNode);
      }
    }
  }, [funcSelectedNode, prevSelectedNode]);

  return (
    <>
      <div className='mx-auto w-full max-w-lg flex flex-col gap-4 rounded-xl'>
        <LocalGraph
          dot={funcLocalDot}
          onExpand={() => setIsGraphOpen(true)}
          onRegenerate={() => setFuncLocalDot(null)}
          isLoading={funcLocalDot ? false : isFuncLocalLoading}
        />

        <div className='my-2 flex flex-col gap-4'>
          <DisclosureSection
            title='Explain the highlighted Class'
            isOpen={isHighlightedOpen}
            disabled={!funcSelectedNode}
            isLoading={funcLocalHighlight ? false : isFuncLocalLoading}
            onToggle={() => setIsHighlightedOpen(!isHighlightedOpen)}
            onRegenerate={() => setFuncLocalHighlight(null)}
            content={renderDisclosureItems(funcLocalHighlight)}
          />

          <DisclosureSection
            title='Relevant Class flow'
            isOpen={isRelevantOpen}
            disabled={!funcSelectedNode}
            isLoading={funcLocalRelevant ? false : isFuncLocalLoading}
            onToggle={() => setIsRelevantOpen(!isRelevantOpen)}
            onRegenerate={() => setFuncLocalRelevant(null)}
            content={renderDisclosureItems(funcLocalRelevant)}
          />
        </div>
      </div>


        {funcSelectedNode && !funcLocalDot && !isFuncLocalLoading && (
          <GptComponent
            queryType='P9_R9_functionCallFlow'
            params={{ selectedNode: funcSelectedNode }}
            onResponseReceived={handleResponseReceived}
            onLoadingChange={handleLoadingChange}
          />
        )}

        {funcSelectedNode && !funcLocalHighlight && !isFuncLocalLoading && (
          <GptComponent
            queryType='P8_R8_functionCallLocalDesc'
            params={{ selectedNode: funcSelectedNode }}
            onResponseReceived={handleResponseReceived}
            onLoadingChange={handleLoadingChange}
          />
        )}

        {funcSelectedNode && !funcLocalRelevant && !isFuncLocalLoading && (
          <GptComponent
            queryType='P10_R10_functionCallLocalExplain'
            params={{ selectedNode: funcSelectedNode }}
            onResponseReceived={handleResponseReceived}
            onLoadingChange={handleLoadingChange}
          />
        )}
      <BaseDialog isOpen={isGraphOpen} onClose={() => setIsGraphOpen(!isGraphOpen)}>
        <AnalysisGraph dotData={funcLocalDot} />
      </BaseDialog>
    </>
  );
};

export default FnLocalUnderstanding;
