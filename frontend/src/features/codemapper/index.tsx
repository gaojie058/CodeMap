import { Link } from "react-router-dom";

const CodeMapper = () => {
  return (
    <>
      <div className='mx-auto max-w-xl px-4 py-6 lg:px-8'>
        Tell us how would you like to understand your code
      </div>
      <div className="flex gap-4">
        <Link to='/understand/business-comps'>Business Components</Link>
        <Link to='/understand/function-call'>Function call</Link>
      </div>
    </>
  );
};

export default CodeMapper;
