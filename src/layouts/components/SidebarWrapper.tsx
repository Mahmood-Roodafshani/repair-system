import {
  alpha,
  Box,
  Button,
  darken,
  Divider,
  Drawer,
  lighten,
  styled,
  useTheme
} from '@mui/material';
import { ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router';
import Logo from 'src/components/LogoSign';
import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';

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
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          right: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Scrollbar>
          <Button
            onClick={() => navigate('/dashboard')}
            sx={{
              width: '100%',
              borderRadius: 0,
              backgroundColor: theme.colors.custom.lightBlue
            }}
            variant="contained"
          >
            داشبورد
          </Button>
          {/*<Box mt={3}> */}
          {/*  <Box*/}
          {/*    mx={2}*/}
          {/*    sx={{*/}
          {/*      width: 52*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    /!*<Logo />*!/*/}
          {/*  </Box>*/}
          {/*</Box>*/}
          {/*<Divider*/}
          {/*  sx={{*/}
          {/*    mt: theme.spacing(3),*/}
          {/*    mx: theme.spacing(2),*/}
          {/*    background: theme.colors.alpha.trueWhite[10]*/}
          {/*  }}*/}
          {/*/>*/}
          {children}
        </Scrollbar>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5)
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            />
            {children}
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default SidebarWrapper;
