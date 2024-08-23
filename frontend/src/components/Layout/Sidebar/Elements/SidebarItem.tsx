import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon }) => {
  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(`
          flex items-center justify-center w-full h-full p-4 rounded select-none hover:bg-gray-100 hover:cursor-default
          ${isActive && 'bg-[#56B1F0] !text-white hover:!bg-[#56B1F0]'}
        `)
        }
      >
        <span className='h-8 w-8'>{icon}</span>
      </NavLink>
    </>
  );
};

export default SidebarItem;
