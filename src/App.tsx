import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SidebarProvider } from './contexts/SidebarContext';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <SidebarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
export default App;
