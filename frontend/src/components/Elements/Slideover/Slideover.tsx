import React, { LegacyRef } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import IconButton from '../Button/IconButton';

interface SlideoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialFocus?: LegacyRef<HTMLDivElement> | undefined;
  cancelButton?: boolean;
}

const Slideover: React.FC<SlideoverProps> = ({
  isOpen,
  onClose,
  children,
  initialFocus,
  cancelButton = false,
}) => {
  return (
    <Transition
      show={isOpen}
      as={React.Fragment}
      enter='transition-transform duration-300'
      enterFrom='translate-x-full'
      enterTo='translate-x-0'
      leave='transition-transform duration-300'
      leaveFrom='translate-x-0'
      leaveTo='translate-x-full'
    >
      <div
        className='fixed right-0 top-14 h-full w-[478px] bg-white shadow-lg flex flex-col p-4 z-40'
        aria-modal='true'
        role='dialog'
        ref={initialFocus}
      >
        {cancelButton && (
          <IconButton
            icon={<XMarkIcon />}
            onClick={onClose}
            className='absolute top-4 right-4 z-50'
          />
        )}
        {children}
      </div>
    </Transition>
  );
};

export default Slideover;
