import React from 'react';
import { Drawer, Box } from '@mui/material';
import { useSidebarContext } from '../../../contexts/SidebarContext';
import { styled } from '@mui/material/styles';
import SidebarMenu from './SidebarMenu';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: theme.spacing(30),
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: theme.spacing(30),
    boxSizing: 'border-box',
    backgroundColor: theme.sidebar.background,
    color: theme.sidebar.textColor,
  },
}));

const SidebarContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  overflow: 'auto'
}));

const Sidebar: React.FC = () => {
  const { sidebarToggle } = useSidebarContext();

  return (
    <StyledDrawer
      variant="permanent"
      anchor="right"
      open={!sidebarToggle}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        <SidebarMenu />
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar; 