import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';

const understandings = [
  {
    name: 'Project Structure',
    api: '',
  },
  {
    name: 'Distribution of Modules in the Project Structure',
    api: '',
  },
  {
    name: 'Distribution of Files in the Project Structure',
    api: '',
  },
];
const BusinessGlobalUnderstanding: React.FC = () => {
  return (
    <>
      <div className='h-screen w-full'>
        <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
          {understandings.map((item, index) => (
            <Disclosure
              as='div'
              className='p-6'
              key={index}
              defaultOpen={index === 0}
            >
              {({ open }) => (
                <>
                  <DisclosureButton className='group flex w-full items-center justify-between'>
                    <span className='text-sm/6 font-medium text-black group-data-[hover]:text-black/80'>
                      {item.name}
                    </span>
                    <ChevronDownIcon
                      className={`size-5 fill-white/60 ${
                        open ? 'rotate-180' : 'group-data-[hover]:fill-white/50'
                      }`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className='mt-2 text-sm/5 text-black/50'>
                    {item.api}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </>
  );
};

export default BusinessGlobalUnderstanding;
