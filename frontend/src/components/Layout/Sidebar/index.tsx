import React from 'react';
import styled from '@emotion/styled';
import SidebarItem from './Elements/SidebarItem';
import { FolderIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const sidebarWidth = 96;

const SidebarContainer = styled.div`
  width: ${sidebarWidth}px;
`;

const Sidebar: React.FC = () => {
  return (
    <>
      <SidebarContainer
        id='sidebar'
        className={`flex flex-shrink-0 relative h-screen border-r border-gray-200 ml-[-${sidebarWidth}px]`}
        aria-label='sidebar'
      >
        <div className='relative h-full w-full px-4 py-6'>
          <div className='flex flex-col gap-8'>
            <SidebarItem to='/' icon={<FolderIcon />} />
            <SidebarItem to='/understand' icon={<LightBulbIcon />} />
          </div>
        </div>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
