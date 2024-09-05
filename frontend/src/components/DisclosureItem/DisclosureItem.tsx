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
    value: string | null | undefined;
  };
}

// DisclosureItem is a reusable component that renders a collapsible disclosure item
// It shows a button with an item name and a chevron icon that indicates whether the panel is open or closed.
// The panel contains detailed information about the item, which can be replaced with dynamic content if needed.
const DisclosureItem: React.FC<DisclosureItemProps> = ({ item}) => {

  const renderContent = (value: unknown, depth = 0): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span>No value</span>;
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return <span>{String(value)}</span>;
    }

    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      const entries = Array.isArray(value) ? value.map((v, i) => [i, v]) : Object.entries(value);
      return (
        <ul className={`${depth === 0 ? 'list-disc' : 'list-none'} pl-${depth === 0 ? 5 : 3}`}>
          {entries.map(([key, val], index) => (
            <li key={index} className="mb-1">
              {!Array.isArray(value) && (
                <span className="font-medium">{key}: </span>
              )}
              {renderContent(val, depth + 1)}
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  const parseAndRenderValue = (value: string | null | undefined) => {
    if (value === null || value === undefined) {
      return <span>No value</span>;
    }

    const trimmed = value.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        const parsedValue = JSON.parse(trimmed);
        return renderContent(parsedValue);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    }
    return renderContent(value);
  };

  return (
    <Disclosure as="div" className="p-6" key={item.key}>
      {({ open }) => (
        <>
          <DisclosureButton className="group flex w-full items-center justify-between text-left">
            <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
              {item.name}
            </span>
            <ChevronDownIcon
              className={`size-4 fill-white/60 ${
                open ? 'rotate-180' : 'group-data-[hover]:fill-white/50'
              }`}
            />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
            <div className="pl-6">
              {parseAndRenderValue(item.value)}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
);
};

export default DisclosureItem;
