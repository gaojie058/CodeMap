import React from 'react';
import { Header } from '@/components/Layout/Header';

/**
 * Renders the "Landing" section of the application.
 * Acts as the default landing page, allowing users to upload code folders.
 */
const Landing: React.FC = () => {
  return (
    <>
      <Header />

      {/** Landing Content */}
      <div className='mx-auto max-w-7xl px-4 py-6 lg:px-8'>
        <div className='flex items-center'>
          <div className='grid grid-cols-5 gap-4'>
            <div className='col-span-2'>
            </div>

            {/** Landing Folder Upload Space */}
            <div className='col-span-3'>
              <p>
                CodeMap can help you understand a codebase in a visualization
                way, start from uploading a codebase.
              </p>
              <button
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2d focus:outline-none'
              >
                Browse file
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
