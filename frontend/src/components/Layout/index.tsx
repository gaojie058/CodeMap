import React from 'react';
import Sidebar from './Sidebar';
import { Header } from './Header';
import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  container-name: multi-select-container;
  container-type: inline-size;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const ContentContainer = styled.div`
  // padding: 1rem 2rem;
  overflow: hidden;
`;

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex h-full w-full overflow-hidden'>
          <LayoutContainer>
            <Routes>
              <Route path='/understand/*' element={<Header />} />
            </Routes>
            <div className='flex h-full w-full overflow-hidden'>
              <Routes>
                {/* <Route path='/understand/*' element={<Sidebar />} /> */}
              </Routes>
              <MainContainer>
                <main
                  id='main-content'
                  className='flex flex-col flex-grow-1 min-h-96'
                  aria-label='Main Content'
                >
                  <ContentContainer>{children}</ContentContainer>
                </main>
              </MainContainer>
            </div>
          </LayoutContainer>
        </div>
      </div>
    </>
  );
};

export default Layout;
