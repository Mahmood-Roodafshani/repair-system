import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeycloakProvider } from './providers/KeycloakProvider';
import {ThemeProvider as CustomThemeProvider} from './theme/ThemeProvider';
import AppRoutes from './routes';
import { setupAxiosInterceptors } from './services/baseService';
import { useKeycloakInstance } from './hooks/useKeycloakInstance';
import { useEffect } from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SidebarProvider } from './contexts/SidebarContext';
import { MenuProvider } from './contexts/MenuContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const keycloak = useKeycloakInstance();

  useEffect(() => {
    if (keycloak) {
      setupAxiosInterceptors(keycloak);
    }
  }, [keycloak]);

  return (
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider>
        <CustomThemeProvider>
          <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SidebarProvider>
                <MenuProvider>
                  <CssBaseline />
                  <AppRoutes />
                  <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </MenuProvider>
              </SidebarProvider>
            </LocalizationProvider>
          </BrowserRouter>
        </CustomThemeProvider>
      </KeycloakProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
