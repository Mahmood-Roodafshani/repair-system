import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const SIDEBAR_WIDTH = 240;
const SIDEBAR_WIDTH_COLLAPSED = 64;
const CONTENT_PADDING = 20;

export const MainWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '64px', // Height of the header
  paddingBottom: '60px', // Height of the footer
  position: 'relative',
}));

export const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<{ isCollapsed: boolean }>(({ theme, isCollapsed }) => ({
  flexGrow: 1,
  position: 'absolute',
  left: CONTENT_PADDING,
  right: SIDEBAR_WIDTH_COLLAPSED,
  transition: theme.transitions.create('right', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
})); 