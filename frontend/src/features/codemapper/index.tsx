import { Link } from 'react-router-dom';
import TreeStructure from '/icons/Tree Structure.png';
import Tree from '/icons/Tree.png';

/**
 * Renders the "Understanding" section of the application.
 * Displays a list of items and redirects users to the "Business Component" or "Function Call" pages based on their interactions.
 */
const CodeMapper = () => {
  return (
    <>
      <div className='mx-auto max-w-4xl px-4 py-6 my-16'>
        <div>
          <p className='text-xl font-medium text-center'>
            Tell us how would you like to understand your code
          </p>
          <div className='flex gap-8 mt-16 justify-center'>
            <Link
              to='/understand/business-comps'
              className='flex flex-col bg-white border shadow-sm rounded-xl max-w-80 flex-grow hover:shadow-lg hover:shadow-[#56B1F0]/20'
            >
              <div className='px-6 py-8'>
                <div className='flex items-center justify-center size-[42px] rounded-full bg-[#56B1F0] mb-2'>
                  <img
                    src={TreeStructure}
                    className='h-6 w-6'
                    alt='Tree Structure Icon'
                  />
                </div>
                <h3 className='text-xl font-bold text-gray-800'>
                  Business Components
                </h3>
                <p className='mt-2 text-gray-500'>
                  Business components are the parts of the codebase that
                  implement core business logic, domain models, and data
                  handling, driving the application's primary functions.
                </p>
              </div>
            </Link>
            <Link
              to='/understand/function-call'
              className='flex flex-col bg-white border shadow-sm rounded-xl max-w-80 flex-grow hover:shadow-lg hover:shadow-[#56B1F0]/20'
            >
              <div className='px-6 py-8'>
                <div className='flex items-center justify-center size-[42px] rounded-full bg-[#56B1F0] mb-2'>
                  <img
                    src={Tree}
                    className='h-6 w-6'
                    alt='Tree Structure Icon'
                  />
                </div>
                <h3 className='text-xl font-bold text-gray-800'>
                  Function Call
                </h3>
                <p className='mt-2 text-gray-500'>
                  Hierarchical flow of functions, showing how different
                  functions interact and depend on each other throughout the
                  application.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeMapper;
