import React, { useRef, useEffect, useCallback } from 'react';
import './style/graph.style.css';
import { graphviz } from 'd3-graphviz';
import useToolbarStore from '@/store/toolbarStore';
import Button from '@/components/Elements/Button/Button';
import IconButton from '@/components/Elements/Button/IconButton';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import Spinner from '@/components/Elements/Spinner/Spinner';
import useStore from '@/store/store';

interface AnalysisGraphProps {
  dotData: string | null;
  understanding?: 'businesscomponent' | 'functioncall' | null;
}

// TODO: Add highlighted nodes and edges when clicked
export const AnalysisGraph: React.FC<AnalysisGraphProps> = ({ dotData, understanding }) => {
  const graphRef = useRef<HTMLDivElement | null>(null);

  const { toolbarContext, isToolbarOpen, setIsToolbarOpen } = useToolbarStore();
  const { setBizCompSelectedNode, setFnCallSelectedNode } = useStore();

  // TODO: Triggers `Toolbar` when clicked
  const handleNodeClick = useCallback((event: MouseEvent) => {
    const target = event.currentTarget as SVGElement;
    const labelElement = target.querySelector('text');
    const label = labelElement?.textContent || '';
    setIsToolbarOpen(true, 'local');
    if (understanding === 'businesscomponent') {
      setBizCompSelectedNode(label);
    } else if (understanding === 'functioncall') {
      setFnCallSelectedNode(label);
    }
  }, []);

  const handleEdgeClick = useCallback((event: MouseEvent) => {
    const target = event.currentTarget as SVGElement;
    const labelElement = target.querySelector('text');
    const label = labelElement?.textContent || '';
    alert(`Edge label: ${label}`);
  }, []);

  useEffect(() => {
    const renderGraph = () => {
      if (graphRef.current) {
        const graphContainer = graphRef.current;

        if (!dotData) return;

        const graph = graphviz(graphContainer)
          .renderDot(dotData)
          .growEnteringEdges(true)
          .fit(true);

        graph.on('end', () => {
          // Event Listener of `Nodes` for interactivity
          const nodes = graphContainer.querySelectorAll('g.node');
          nodes.forEach((node) => {
            node.addEventListener('click', handleNodeClick as EventListener);
          });

          // Event Listener of `Edges` for interactivity
          const edges = graphContainer.querySelectorAll('g.edge');
          edges.forEach((edge) => {
            edge.addEventListener('click', handleEdgeClick as EventListener);
          });
        });
      }
    };

    renderGraph();

    window.addEventListener('resize', renderGraph);

    return () => {
      window.removeEventListener('resize', renderGraph);

      if (graphRef.current) {
        const nodes = graphRef.current.querySelectorAll('g.node');
        nodes.forEach((node) => {
          node.removeEventListener('click', () => handleNodeClick);
        });

        const edges = graphRef.current.querySelectorAll('g.edge');
        edges.forEach((edge) => {
          edge.removeEventListener('click', () => handleEdgeClick);
        });
      }
    };
  }, [dotData]);

  return (
    <div
      ref={graphRef}
      id='graph-container'
      style={{ textAlign: 'center', height: '100%', width: '100%' }}
    ></div>
  );
};


interface LocalGraph {
  dot: string | null;
  onExpand: () => void;
  onRegenerate: () => void;
  isLoading?: boolean;
}
export const LocalGraph: React.FC<LocalGraph> = ({ dot, onExpand, onRegenerate, isLoading }) => {
  return (
    <div className='w-full h-64 border border-gray-200 rounded-lg relative flex items-center justify-center'>
      {dot ? (
        <>
          <AnalysisGraph dotData={dot} />
          <IconButton
            icon={<ArrowsPointingOutIcon />}
            onClick={onExpand}
            className='absolute top-0 right-0 mt-2 mr-2'
          />
        </>
      ) : isLoading ? (
          <Spinner loadingText='Loading localmap...' />
      ) : (
        <span className='text-xs font-medium text-zinc-500'>
          Select a node to check its detailed map.
        </span>
      )}
      <Button
        variant='black'
        className='absolute bottom-0 right-0 mb-2 mr-2'
        onClick={onRegenerate}
      >
        Regenerate
      </Button>
    </div>
  );
};
