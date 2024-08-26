import React from 'react';
import Toolbar from '../toolbar';
import { AnalysisGraph } from '../graph';
import { dotData } from '@/data/dotData';
import useSlideoverStore from '@/store/slideoverStore';

/**
 * Renders the `Function Call` section of Code Mapper
 * The rendered UI element containing the section's title, graph visualization, and toolbar.
 */
const FunctionCall: React.FC = () => {
  const { isSlideoverOpen, toggleSlideover } = useSlideoverStore();

  return (
    <>
      <div>Function Call</div>
      <div className='w-full h-screen overflow-hidden'>

        {/* 
            Main graph component that renders data from "dot format"
            TODO: Replace the `dotData` with data from `GptComponent` 
        */}
        <AnalysisGraph dotData={dotData} />
      </div>

      {/* React component displays `Global` and `Local` understandings */}
      <Toolbar
        isOpen={isSlideoverOpen}
        onClose={toggleSlideover}
        type='FUNCTION_CALL'
      />
    </>
  );
};

export default FunctionCall;
