import { alpha, Box, lighten, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

function SidebarBaseLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`
          }
        }}
      >
        <Header />
        {children}
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: '64px', // Default header height
            pb: '64px', // Default footer height 
            [theme.breakpoints.up('lg')]: {
              mr: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block" mt={'25px'}>
            <Outlet />
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default SidebarBaseLayout;
