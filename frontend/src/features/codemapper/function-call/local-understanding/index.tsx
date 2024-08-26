import React from 'react';
import {
  ArrowsPointingOutIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { AnalysisGraph } from '../../graph';
import Button from '@/components/Elements/Button/Button';
import IconButton from '@/components/Elements/Button/IconButton';
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
  const [hasDot, setHasDot] = useState<boolean>(false);
  const [isMiniGraphOpen, setIsMiniGraphOpen] = useState<boolean>(false);

  //dummy disclosure setup
  const [isHighlightedExpOpen, setIsHighlightedExpOpen] =
    useState<boolean>(false);
  const [isRelevantExpOpen, setIsRelevantExpOpen] = useState<boolean>(false);

  return (
    <>
      <div className='mx-auto w-full max-w-lg flex flex-col gap-4 rounded-xl'>
        
        {/* 
            `Mini Graph` container
            TODO: Separate Component, add data from `GptComponent`
        */}
        <div className='w-full h-64 border border-gray-200 rounded-lg relative flex items-center justify-center'>
          {hasDot ? (
            <>
              <AnalysisGraph dotData='digraph {a -> b}' />
              <IconButton
                icon={<ArrowsPointingOutIcon />}
                onClick={() => setIsMiniGraphOpen(true)}
                className='absolute top-0 right-0 mt-2 mr-2'
              />
            </>
          ) : (
            <span className='text-xs font-medium text-zinc-500'>
              Select a node to check its detailed map.
            </span>
          )}
          <Button
            variant='black'
            className='absolute bottom-0 right-0 mb-2 mr-2'
            onClick={() => setHasDot(!hasDot)}
          >
            Regenerate
          </Button>
        </div>

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
      </div>

      {/* Dialog that displays expanded `Mini Graph` in Local Understanding  */}
      <BaseDialog
        isOpen={isMiniGraphOpen}
        onClose={() => setIsMiniGraphOpen(!isMiniGraphOpen)}
      >
        <AnalysisGraph dotData='digraph {a -> b}' />
      </BaseDialog>
    </>
  );
};

export default FnLocalUnderstanding;
