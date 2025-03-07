import {
  alpha,
  Box,
  Button,
  darken,
  lighten,
  styled,
  useTheme
} from '@mui/material';
import { ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router';
import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { i18n } from 'src/i18n';
import SidebarToggle from './SidebarToggle';
import AppMenu from './Menu/AppMenu';

function SidebarWrapper({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const SidebarWrapper = styled(Box)(
    ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
  );
  const navigate = useNavigate();

  return (
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
        right: sidebarToggle ? 0 : `-${theme.sidebar.width}`,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
          theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none',
        transition: theme.transitions.create(['right'])
        }}
      >
      <SidebarToggle />
        <Scrollbar>
          <Button
            onClick={() => navigate('/dashboard')}
            sx={{
              width: '100%',
              borderRadius: 0,
              backgroundColor: theme.colors.custom.lightBlue,
              color: theme.colors.custom.darkBlue
            }}
            variant="contained"
          >
            {i18n.t('dashboard').toString()}
          </Button>
        <AppMenu drawerOpen={sidebarToggle} />
          </Scrollbar>
        </SidebarWrapper>
  );
}

export default SidebarWrapper;
