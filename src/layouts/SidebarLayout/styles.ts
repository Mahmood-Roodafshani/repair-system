import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Theme } from '@mui/material/styles';

const SIDEBAR_WIDTH = 240;
const SIDEBAR_WIDTH_COLLAPSED = 64;

export const MainWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '64px', // Height of the header
  paddingBottom: '60px', // Height of the footer
  position: 'relative',
  width: '100%',
  marginRight: SIDEBAR_WIDTH,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  '&.collapsed': {
    marginRight: SIDEBAR_WIDTH_COLLAPSED
  }
}));

export const MainContent = styled(Box)(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(12),
  width: '100%',
  '& .MuiContainer-root': {
    padding: theme.spacing(2)
  },
  '& .MuiCard-root': {
    marginBottom: theme.spacing(3)
  }
}));
