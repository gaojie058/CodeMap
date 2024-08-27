import React from 'react';
import DisclosureItem from '@/components/DisclosureItem/DisclosureItem';
// import { GptComponent } from '@gpt/GptComponent';

// defines `understandings` that will be rendered as collapsible items
// TODO: add data from `GptComponent`
const understandings = [
  {
    name: 'Overview',
    api: '',
  },
  {
    name: 'Inheritance Relationship',
    api: '',
  },
  {
    name: 'Parent Class',
    api: '',
  },
  {
    name: 'Child Class',
    api: '',
  },
  {
    name: 'Significance of Relationship',
    api: '',
  },
];

/**
 * Renders `Global Understanding` section of `Function Call` page.
 * This component is used within the `Toolbar` to display a list of items with collapsible details.
 */
const FnGlobalUnderstanding: React.FC = () => {
  return (
    <>
      <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
        {understandings.map((item, index) => (
          <DisclosureItem item={item} key={index} />
        ))}

        {/* <GptComponent queryType='systemStructureDot' /> */}
      </div>
    </>
  );
};

export default FnGlobalUnderstanding;
