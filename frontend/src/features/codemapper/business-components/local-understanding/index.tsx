import React from 'react';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';

// defines `understandings` that will be rendered as collapsible items
// TODO: add data from `GptComponent`
const understandings = [
  {
    name: 'Explain the highlighted business flow',
  },
  {
    name: 'Relevant business flow',
  },
];

/**
 * Renders `Local Understanding` section of `Business Components` page.
 * This component is used within the `Toolbar` to display a list of items with collapsible details.
 */
const BizLocalUnderstanding: React.FC = () => {
  return (
    <>
      <div className='h-screen w-full'>
        <div className='mx-auto w-full max-w-lg flex flex-col gap-4 rounded-xl'>
          {understandings.map((item, index) => (
            <DisclosureItem item={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BizLocalUnderstanding;
