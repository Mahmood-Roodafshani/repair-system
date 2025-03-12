import React from 'react';
import { Drawer, Box } from '@mui/material';
import { useSidebarContext } from '../../../contexts/SidebarContext';
import { styled } from '@mui/material/styles';
import SidebarMenu from './SidebarMenu';

const SIDEBAR_WIDTH = 240;
const SIDEBAR_WIDTH_COLLAPSED = 64;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'isCollapsed'
})<{ isCollapsed: boolean }>(({ theme, isCollapsed }) => ({
  width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    overflowX: 'hidden',
    backgroundColor: theme.sidebar.background,
    color: theme.sidebar.textColor,
    borderLeft: `1px solid ${theme.sidebar.dividerBg}`,
    '& > *': {
      // Prevent children from transitioning
      transition: 'none !important',
    }
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
      isCollapsed={sidebarToggle}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        <SidebarMenu isCollapsed={sidebarToggle} />
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar; 