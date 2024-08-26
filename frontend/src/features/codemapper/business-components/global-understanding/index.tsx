import React from 'react';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';

// defines `understandings` that will be rendered as collapsible items
// TODO: add data from `GptComponent`
const understandings = [
  {
    name: 'Project Structure',
  },
  {
    name: 'Distribution of Modules in the Project Structure',
  },
  {
    name: 'Distribution of Files in the Project Structure',
  },
];

/**
 * Renders `Global Understanding` section of `Business Components` page.
 * This component is used within the `Toolbar` to display a list of items with collapsible details.
 */
const BizGlobalUnderstanding: React.FC = () => {
  return (
    <>
      <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
        {understandings.map((item, index) => (
          <DisclosureItem item={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default BizGlobalUnderstanding;
