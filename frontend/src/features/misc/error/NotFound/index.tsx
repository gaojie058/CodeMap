import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <>
      <div className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <p className='text-base font-semibold'>404</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            Page not found
          </h1>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link to={`/`}>
              <button>Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
