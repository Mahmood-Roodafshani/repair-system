import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSidebarContext } from '../../contexts/SidebarContext';
import Header from './Header';
import Sidebar from './Sidebar';
import { MainContent, MainWrapper } from './styles';

const SidebarLayout: React.FC = () => {
  const { sidebarToggle, toggleSidebar } = useSidebarContext();

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <MainWrapper>
        <Header onMenuClick={toggleSidebar} />
        <MainContent isCollapsed={sidebarToggle}>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </Box>
  );
};

export default SidebarLayout; 