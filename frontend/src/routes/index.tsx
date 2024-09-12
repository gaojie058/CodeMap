import App from '@/App';
import CodeMapper from '@/features/codemapper';
import NotFound from '@/features/misc/error/NotFound';
import { Routes, Route } from 'react-router-dom';
import FunctionCall from '@/features/codemapper/function-call';
import BusinessComponents from '@/features/codemapper/business-components';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/**
         * Defines all routes within the application
         * Renders the main App component if the file upload is successful, otherwise renders the Landing component
         *
         * Routes under this can only be accessed after user uploads source code files.
         */}
        <Route path='/' element={<App />}>
          <Route index element={<CodeMapper />} />
          <Route path='/understand/business-comps' element={<BusinessComponents />} />
          <Route path='/understand/function-call' element={<FunctionCall />} />
        </Route>

        {/**
         * Error Route
         * Renders the `NotFound` component when accessing any route that does not match the defined routes.
         */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};
