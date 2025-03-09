import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './theme/ThemeProvider';
import { SidebarProvider } from './contexts/SidebarContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { faIR } from 'date-fns/locale';
import AppRoutes from './router';

function App() {
  return (
      <ThemeProvider>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={faIR as any}>
          <SidebarProvider>
              <AppRoutes />
          </SidebarProvider>
        </LocalizationProvider>
      </ThemeProvider>
  );
}

export default App;
