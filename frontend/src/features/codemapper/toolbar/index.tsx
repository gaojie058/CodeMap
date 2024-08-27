import React from 'react';
import Slideover from '@/components/Elements/Slideover/Slideover';
import FnLocalUnderstanding from '../function-call/local-understanding';
import FnGlobalUnderstanding from '../function-call/global-understanding';
import BizLocalUnderstanding from '../business-components/local-understanding';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import BizGlobalUnderstanding from '../business-components/global-understanding';
import useToolbarStore from '@/store/toolbarStore';

type UnderstandingType = 'BUSINESS' | 'FUNCTION_CALL';

interface ToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  type: UnderstandingType;
}
const Toolbar: React.FC<ToolbarProps> = ({ isOpen, onClose, type }) => {
  const { selectedNode } = useToolbarStore();

  const renderContent = () => {
    switch (type) {
      case 'BUSINESS':
        return (
          <>
            <TabPanel>
              <BizGlobalUnderstanding />
            </TabPanel>
            <TabPanel>
              <BizLocalUnderstanding />
            </TabPanel>
          </>
        );
      case 'FUNCTION_CALL':
        return (
          <>
            <TabPanel>
              <FnGlobalUnderstanding />
            </TabPanel>
            <TabPanel>
              <FnLocalUnderstanding />
            </TabPanel>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Slideover isOpen={isOpen} onClose={onClose}>
        <TabGroup className='w-full h-screen pb-4'>
          <div className='w-full h-full flex flex-col gap-0 justify-between'>
            <article className='w-full flex flex-col bg-white overflow-hidden'>
              <TabList className='bg-zinc-100 p-1 rounded-md flex gap-2 mb-2'>
                <Tab className='w-full rounded-md py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black'>
                  Global Understanding
                </Tab>
                <Tab className='w-full rounded-md py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black'>
                  Local Understanding
                </Tab>
              </TabList>
              <section className='min-h-0 flex-1 flex-grow overflow-y-auto'>
                {selectedNode && <div className='text-xs'>SelectedNode: {selectedNode}</div>}
                <TabPanels className='my-4'>{renderContent()}</TabPanels>
              </section>
              <section className='flex justify-center bg-white h-16'></section>
            </article>
          </div>
        </TabGroup>
      </Slideover>
    </>
  );
};

export default Toolbar;
