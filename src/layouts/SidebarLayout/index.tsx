import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSidebarContext } from '../../contexts/SidebarContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from '../components/Footer';
import { MainContent, MainWrapper } from './styles';

const SidebarLayout: React.FC = () => {
  const { sidebarToggle, toggleSidebar } = useSidebarContext();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <MainWrapper className={sidebarToggle ? 'collapsed' : ''}>
        <Header onMenuClick={toggleSidebar} isCollapsed={sidebarToggle} />
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer />
      </MainWrapper>
    </Box>
  );
};

export default SidebarLayout; 