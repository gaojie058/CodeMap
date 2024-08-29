import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';

interface DisclosureItemProps {
  item: {
    name: string;
    key: string;
    value: string | null;
  };
}

// DisclosureItem is a reusable component that renders a collapsible disclosure item
// It shows a button with an item name and a chevron icon that indicates whether the panel is open or closed.
// The panel contains detailed information about the item, which can be replaced with dynamic content if needed.
const DisclosureItem: React.FC<DisclosureItemProps> = ({ item}) => {
  return (
    <Disclosure as='div' className='p-6' key={item.key}>
      {({ open }) => (
        <>
          <DisclosureButton className='group flex w-full items-center justify-between text-left'>
            <span className='text-sm/6 font-medium text-black group-data-[hover]:text-black/80'>
              {item.name}
            </span>
            <ChevronDownIcon
              className={`size-4 fill-white/60 ${
                open ? 'rotate-180' : 'group-data-[hover]:fill-white/50'
              }`}
            />
          </DisclosureButton>
          <DisclosurePanel className='mt-2 text-sm/5 text-black/50'>
            {item.value}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default DisclosureItem;
