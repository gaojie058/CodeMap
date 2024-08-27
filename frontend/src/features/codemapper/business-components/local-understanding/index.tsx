import React, { useState } from 'react';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// defines `understandings` that will be rendered as collapsible items
// TODO: add data from `GptComponent`
const highlightedBusinessFlow = [
  {
    name: 'Business Flow Overview',
  },
  {
    name: 'Role of the Highlighted Business Flow in the Overall Framework',
  },
  {
    name: 'Roles of Each Component Under This Business Flow',
  },
];

const relevantBusinessFlow = [
  {
    name: 'Business Flow Overview',
  },
  {
    name: 'Role of the Highlighted Business Flow in the Overall Framework',
  },
  {
    name: 'Roles of Each Component Under This Business Flow',
  },
];

/**
 * Renders `Local Understanding` section of `Business Components` page.
 * This component is used within the `Toolbar` to display a list of items with collapsible details.
 */
const BizLocalUnderstanding: React.FC = () => {
  //dummy disclosure setup
  const [isHighlightedExpOpen, setIsHighlightedExpOpen] =
    useState<boolean>(false);
  const [isRelevantExpOpen, setIsRelevantExpOpen] = useState<boolean>(false);

  return (
    <>
      <div className='h-screen w-full'>
        <div className='mx-auto w-full max-w-lg flex flex-col gap-4 rounded-xl'>
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
                  highlightedBusinessFlow.map((item, index) => (
                    <DisclosureItem item={item} key={index} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BizLocalUnderstanding;
