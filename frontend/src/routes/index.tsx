import App from '@/App';
import Landing from '@/features/landing';
import useFileStore from '@/store/fileStore';
import CodeMapper from '@/features/codemapper';
import NotFound from '@/features/misc/error/NotFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import FunctionCall from '@/features/codemapper/function-call';
import CodeViewer from '@/features/codeviewer';
import BusinessComponents from '@/features/codemapper/business-components';

export const AppRouter = () => {
  const { isFileUploaded } = useFileStore();

  interface ConditionalRouteProps {
    element: React.ReactNode;
    fallbackElement: React.ReactNode;
  }
  const ConditionalRoute: React.FC<ConditionalRouteProps> = ({
    element,
    fallbackElement,
  }) => {
    if (!isFileUploaded) {
      return (
        <>
          {fallbackElement}
          <Navigate to='/' />
        </>
      );
    }
    return element;
  };
  return (
    <>
      <Routes>
        {/**
         * Defines all routes within the application
         * Renders the main App component if the file upload is successful, otherwise renders the Landing component
         *
         * Routes under this can only be accessed after user uploads source code files.
         */}
        <Route
          path='/'
          element={
            <ConditionalRoute element={<App />} fallbackElement={<Landing />} />
          }
        >
          {/**
           * Code Viewer Route
           * Renders `CodeViewer` page as the landing page after successful code upload.
           */}
          <Route index element={<CodeViewer />} />

          {/**
           * Defines routes for the /understand path
           * Routes under this will mainly be associated with OpenAI API
           */}
          <Route path='/understand'>
            <Route index element={<CodeMapper />} />
            <Route path='business-comps' element={<BusinessComponents />} />
            <Route path='function-call' element={<FunctionCall />} />
          </Route>
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
