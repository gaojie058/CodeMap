import React from 'react';
import Slideover from '@/components/Elements/Slideover/Slideover';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import BusinessGlobalUnderstanding from '../function-call/global-understanding';

interface ToolbarProps {
  isOpen: boolean;
  onClose: () => void;
}
const Toolbar: React.FC<ToolbarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Slideover isOpen={isOpen} onClose={onClose}>
        <div>
          <TabGroup>
            <TabList className='bg-zinc-100 p-1 rounded-md flex gap-2'>
              <Tab className='w-full rounded-md py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black'>
                Global Understanding
              </Tab>
              <Tab className='w-full rounded-md py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black'>
                Local Understanding
              </Tab>
            </TabList>
            <TabPanels className='my-4'>
              <TabPanel>
                <BusinessGlobalUnderstanding />
              </TabPanel>
              <TabPanel>Content 2</TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </Slideover>
    </>
  );
};

export default Toolbar;
