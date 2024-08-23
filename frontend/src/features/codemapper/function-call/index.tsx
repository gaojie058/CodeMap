import React from 'react';
import Toolbar from '../toolbar';
import useSlideoverStore from '@/store/slideoverStore';

const FunctionCall: React.FC = () => {
  const { isSlideoverOpen, toggleSlideover }= useSlideoverStore();

  return (
    <>
      <div>Function Call</div>
      <Toolbar isOpen={isSlideoverOpen} onClose={toggleSlideover} />
    </>
  );
};

export default FunctionCall;
