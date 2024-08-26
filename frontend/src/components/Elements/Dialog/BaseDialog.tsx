import React, { MutableRefObject, useState } from 'react';
import {
  XMarkIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline';
import IconButton from '../Button/IconButton';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialFocus?: MutableRefObject<HTMLElement | null> | undefined;
  cancelButton?: boolean;
  expandable?: boolean;
}
const BaseDialog: React.FC<BaseDialogProps> = ({
  isOpen,
  onClose,
  children,
  initialFocus,
  cancelButton = true,
  expandable = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const dialogPanelClassNames = `relative mx-auto min-w-sm p-6 bg-white rounded-2xl ${
    isFullscreen ? 'w-screen h-full' : 'w-screen max-w-6xl h-full'
  }`;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className='relative z-50'
      initialFocus={initialFocus}
    >
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/25' aria-hidden='true' />

      {/* Centered Dialog */}
      <div className='fixed inset-0 flex items-center justify-center p-8'>
        <DialogPanel className={dialogPanelClassNames}>
          {/* Header with buttons */}
          <div className='absolute top-4 right-4 z-20 flex flex-row-reverse gap-4'>
            {cancelButton && (
              <IconButton icon={<XMarkIcon />} onClick={onClose} />
            )}
            {expandable && (
              <IconButton
                icon={
                  isFullscreen ? (
                    <ArrowsPointingInIcon />
                  ) : (
                    <ArrowsPointingOutIcon />
                  )
                }
                onClick={toggleFullscreen}
              />
            )}
          </div>
          {/* Dialog Content */}
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export { BaseDialog, DialogTitle };
