import React from 'react';
import Spinner from '../Elements/Spinner/Spinner';
import { ArrowPathIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import IconButton from '../Elements/Button/IconButton';

interface DisclosureSectionProps {
  title: string;
  isOpen: boolean;
  disabled: boolean;
  isLoading: boolean;
  onToggle: () => void;
  onRegenerate: () => void;
  content: React.ReactNode;
}

const DisclosureSection: React.FC<DisclosureSectionProps> = ({
  title,
  isOpen,
  disabled,
  isLoading,
  onToggle,
  onRegenerate,
  content,
}) => (
  <div>
    <button
      type='button'
      onClick={onToggle}
      className={`w-full px-6 py-2.5 border border-zinc-200 rounded-lg flex justify-between items-center font-medium text-sm ${
        !disabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
      }`}
    >
      {title}
      <IconButton icon={<ArrowPathIcon />} onClick={onRegenerate} className='ml-auto mr-2' disabled={isLoading}/>
      <ChevronDownIcon
        className={`size-4 fill-white/60 ${
          isOpen ? 'rotate-180' : 'group-data-[hover]:fill-white/50'
        }`}
      />
    </button>
    <div className='mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl'>
      {isLoading ? (
        <Spinner loadingText='Loading information...' />
      ) : (
        isOpen && content
      )}
    </div>
  </div>
);

export default DisclosureSection;
