import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label }) => {
  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(`
          flex items-center justify-center gap-2 w-full h-full p-4 rounded-lg select-none hover:bg-gray-100 hover:cursor-default text-sm font-medium
          ${isActive && 'bg-black !text-white hover:!bg-black'}
        `)
        }
      >
        <span className='h-6 w-6'>{icon}</span>
        <span>{label}</span>
      </NavLink>
    </>
  );
};

export default SidebarItem;
