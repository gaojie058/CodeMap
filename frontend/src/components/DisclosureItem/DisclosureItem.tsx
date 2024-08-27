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
  };
  data?: string | null;
}

// DisclosureItem is a reusable component that renders a collapsible disclosure item
// It shows a button with an item name and a chevron icon that indicates whether the panel is open or closed.
// The panel contains detailed information about the item, which can be replaced with dynamic content if needed.
const DisclosureItem: React.FC<DisclosureItemProps> = ({ item, data }) => {
  return (
    <Disclosure as='div' className='p-6'>
      {({ open }) => (
        <>
          <DisclosureButton className='group flex w-full items-center justify-between text-left'>
            <span className='text-sm/6 font-medium text-black group-data-[hover]:text-black/80'>
              {item.name}
            </span>
            <ChevronDownIcon
              className={`size-4 fill-white/60 ${
                open ? 'rotate-180' : 'group-data-[hover]:fill-white/50'
              }`}
            />
          </DisclosureButton>
          <DisclosurePanel className='mt-2 text-sm/5 text-black/50'>
            {!data && (
              <>
                {' '}
                flask/src/flask/init.py: Initializes the Flask module, making it
                accessible when imported. flask/src/flask/app.py: Contains the
                central class for Flask application, defining how the
                application behaves. flask/src/flask/cli.py: Handles the
                command-line interface for Flask applications.
                flask/src/flask/config.py: Manages the configuration of a Flask
                application. flask/src/flask/logging.py: Provides logging
                capabilities within Flask applications.
                flask/src/flask/sessions.py: Handles user sessions in Flask.
                flask/tests/test_logging.py: Tests the logging functionality of
                Flask. flask/tests/test_cli.py: Tests the command-line interface
                functionality. flask/tests/test_apps: Contains test applications
                to simulate real-world scenarios.
              </>
            )}

            {data && data}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default DisclosureItem;
