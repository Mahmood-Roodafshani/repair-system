import { ThemeOptions } from '@mui/material';

export const PureDarkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#757575',
      light: '#BDBDBD',
      dark: '#616161',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E'
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          color: '#FFFFFF',
        }
      }
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8
  },
  // Custom properties
  colors: {
    gradients: {
      blue1: '#2C3E50',
      blue2: '#1A237E',
      blue3: '#0D47A1',
      blue4: '#1565C0',
      blue5: '#1976D2',
      orange1: '#E65100',
      orange2: '#F57C00',
      orange3: '#FF9800',
      purple1: '#4A148C',
      purple3: '#6A1B9A',
      pink1: '#880E4F',
      pink2: '#C2185B',
      green1: '#1B5E20',
      green2: '#2E7D32',
      black1: '#000000',
      black2: '#121212',
    },
    shadows: {
      success: '0 0 20px rgba(46, 204, 113, 0.3)',
      error: '0 0 20px rgba(231, 76, 60, 0.3)',
      primary: '0 0 20px rgba(52, 152, 219, 0.3)',
      warning: '0 0 20px rgba(241, 196, 15, 0.3)',
      info: '0 0 20px rgba(52, 152, 219, 0.3)',
    },
    alpha: {
      white: {
        5: 'rgba(255, 255, 255, 0.05)',
        10: 'rgba(255, 255, 255, 0.1)',
        30: 'rgba(255, 255, 255, 0.3)',
        50: 'rgba(255, 255, 255, 0.5)',
        70: 'rgba(255, 255, 255, 0.7)',
        100: 'rgba(255, 255, 255, 1)',
      },
      trueWhite: {
        5: 'rgba(255, 255, 255, 0.05)',
        10: 'rgba(255, 255, 255, 0.1)',
        30: 'rgba(255, 255, 255, 0.3)',
        50: 'rgba(255, 255, 255, 0.5)',
        70: 'rgba(255, 255, 255, 0.7)',
        100: 'rgba(255, 255, 255, 1)',
      },
      black: {
        5: 'rgba(0, 0, 0, 0.05)',
        10: 'rgba(0, 0, 0, 0.1)',
        30: 'rgba(0, 0, 0, 0.3)',
        50: 'rgba(0, 0, 0, 0.5)',
        70: 'rgba(0, 0, 0, 0.7)',
        100: 'rgba(0, 0, 0, 1)',
      },
    },
    primary: {
      lighter: '#1565C0',
      light: '#1976D2',
      main: '#2196F3',
      dark: '#42A5F5',
    },
    secondary: {
      lighter: '#424242',
      light: '#616161',
      main: '#757575',
      dark: '#9E9E9E',
    },
    success: {
      lighter: '#1B5E20',
      light: '#2E7D32',
      main: '#4CAF50',
      dark: '#81C784',
    },
    warning: {
      lighter: '#E65100',
      light: '#F57C00',
      main: '#FF9800',
      dark: '#FFB74D',
    },
    error: {
      lighter: '#B71C1C',
      light: '#D32F2F',
      main: '#F44336',
      dark: '#E57373',
    },
    info: {
      lighter: '#0D47A1',
      light: '#1565C0',
      main: '#1976D2',
      dark: '#42A5F5',
    },
    custom: {
      darkBlue: '#0D47A1',
      lightBlue: '#1565C0',
      pink: '#880E4F',
    },
  },
  general: {
    reactFrameworkColor: '#00D8FF',
    borderRadiusSm: '6px',
    borderRadius: '8px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px',
  },
  sidebar: {
    background: '#1E1E1E',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    width: '280px',
    right: '0',
    left: '0',
    textColor: '#FFFFFF',
    dividerBg: '#424242',
    menuItemColor: '#B0BEC5',
    menuItemColorActive: '#2196F3',
    menuItemBg: '#1E1E1E',
    menuItemBgActive: '#1A237E',
    menuItemIconColor: '#B0BEC5',
    menuItemIconColorActive: '#2196F3',
    menuItemHeadingColor: '#FFFFFF',
  },
  header: {
    height: '80px',
    background: '#1C1C1C',
    boxShadow: '#000000',
    textColor: '#ffffff'
  },
  footer: {
    height: '60px',
    background: '#1C1C1C',
    color: '#ffffff'
  },
}; 