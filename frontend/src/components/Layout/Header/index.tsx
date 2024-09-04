import React from 'react';
import CodeMapLogo from '/logo.svg';
import styled from '@emotion/styled';
import useToolbarStore from '@/store/toolbarStore';
import Button from '@/components/Elements/Button/Button';
import { Route, Routes, useNavigate } from 'react-router-dom';
import IconButton from '@/components/Elements/Button/IconButton';
import { Bars3BottomRightIcon } from '@heroicons/react/24/outline';

const HeaderHeight = 64;

const HeaderContainer = styled.div`
  height: ${HeaderHeight}px;
  min-height: ${HeaderHeight}px;
  max-height: ${HeaderHeight}px;
`;

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const navigateToBiz = () => navigate('/business-comps');
  const navigateToFn = () => navigate('/function-call');

  const toggleToolbar = useToolbarStore((state) => state.toggleToolbar);

  return (
    <>
      <HeaderContainer className='sticky top-0 z-50 select-none bg-white border-b border-gray-200'>
        <header className='w-full h-full flex items-center px-6 relative'>
          <div className='cursor-pointer' onClick={() => navigate('/')}>
            <img className='h-10' src={CodeMapLogo} alt='logo' />
          </div>
          <div className='flex w-full gap-2 ms-8'>
            <Routes>
              <Route
                path='/understand/business-comps'
                element={
                  <>
                    <Button onClick={navigateToBiz}>Business Component</Button>
                    <Button onClick={navigateToFn} style='outline'>
                      Function Call
                    </Button>
                    <IconButton icon={<Bars3BottomRightIcon />} onClick={toggleToolbar} className='ml-auto'/>
                  </>
                }
              />
              <Route
                path='/understand/function-call'
                element={
                  <>
                    <Button onClick={navigateToBiz} style='outline'>Business Component</Button>
                    <Button onClick={navigateToFn}>
                      Function Call
                    </Button>
                    <IconButton icon={<Bars3BottomRightIcon />} onClick={toggleToolbar} className='ml-auto'/>
                  </>
                }
              />
            </Routes>
            <IconButton icon={<Bars3BottomRightIcon />} onClick={toggleToolbar} className='ml-auto'/>
          </div>
        </header>
      </HeaderContainer>
    </>
  );
};
