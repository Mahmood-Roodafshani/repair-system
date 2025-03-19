import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { SidebarProvider } from './contexts/SidebarContext';
import { MenuProvider } from './contexts/MenuContext';
import { ThemeProvider as CustomThemeProvider } from './theme/ThemeProvider';
import AppRoutes from './router';

function App() {
  return (
    <HelmetProvider>
      <CustomThemeProvider>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SidebarProvider>
            <MenuProvider>
              <AppRoutes />
              <ToastContainer position="bottom-right" />
            </MenuProvider>
          </SidebarProvider>
        </LocalizationProvider>
      </CustomThemeProvider>
    </HelmetProvider>
  );
}

export default App;
