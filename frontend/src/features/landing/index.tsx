import React from 'react';
import useFileStore from '@/store/fileStore';
import { Header } from '@/components/Layout/Header';
import LandingImage from '/images/Young man coding on laptop.png';

const Landing: React.FC = () => {
  const { setIsFileUploaded } = useFileStore();

  const handleBtnClick = () => {
    setIsFileUploaded(true);
  };

  return (
    <>
      <Header />

      {/** Landing Content */}
      <div className='mx-auto max-w-7xl px-4 py-6 lg:px-8'>
        <div className='flex items-center'>
          <div className='grid grid-cols-5 gap-4'>
            <div className='col-span-2'>
              <img src={LandingImage} alt='LandingImage' />
            </div>

            {/** Landing Folder Upload Space */}
            <div className='col-span-3'>
              <p>
                CodeMap can help you understand a codebase in a visualization
                way, start from uploading a codebase.
              </p>
              <button
                type='button'
                onClick={handleBtnClick}
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
