import { ThemeOptions } from '@mui/material';

export const PureLightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3',
      light: '#BBDEFB',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6C757D',
      light: '#E9ECEF',
      dark: '#495057',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#C8E6C9',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FF9800',
      light: '#FFE0B2',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F44336',
      light: '#FFCDD2',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3',
      light: '#BBDEFB',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2C3E50',
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
      blue1: '#4B79A1',
      blue2: '#283E51',
      blue3: '#2C3E50',
      blue4: '#3498DB',
      blue5: '#2980B9',
      orange1: '#F39C12',
      orange2: '#E67E22',
      orange3: '#D35400',
      purple1: '#8E44AD',
      purple3: '#9B59B6',
      pink1: '#E91E63',
      pink2: '#C2185B',
      green1: '#2ECC71',
      green2: '#27AE60',
      black1: '#2C3E50',
      black2: '#34495E',
    },
    shadows: {
      success: '0 0 20px rgba(46, 204, 113, 0.2)',
      error: '0 0 20px rgba(231, 76, 60, 0.2)',
      primary: '0 0 20px rgba(52, 152, 219, 0.2)',
      warning: '0 0 20px rgba(241, 196, 15, 0.2)',
      info: '0 0 20px rgba(52, 152, 219, 0.2)',
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
      lighter: '#E3F2FD',
      light: '#BBDEFB',
      main: '#2196F3',
      dark: '#1976D2',
    },
    secondary: {
      lighter: '#F8F9FA',
      light: '#E9ECEF',
      main: '#6C757D',
      dark: '#495057',
    },
    success: {
      lighter: '#E8F5E9',
      light: '#C8E6C9',
      main: '#4CAF50',
      dark: '#388E3C',
    },
    warning: {
      lighter: '#FFF3E0',
      light: '#FFE0B2',
      main: '#FF9800',
      dark: '#F57C00',
    },
    error: {
      lighter: '#FFEBEE',
      light: '#FFCDD2',
      main: '#F44336',
      dark: '#D32F2F',
    },
    info: {
      lighter: '#E3F2FD',
      light: '#BBDEFB',
      main: '#2196F3',
      dark: '#1976D2',
    },
    custom: {
      darkBlue: '#1A237E',
      lightBlue: '#E3F2FD',
      pink: '#E91E63',
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
    background: '#FFFFFF',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
    width: '280px',
    right: '0',
    left: '0',
    textColor: '#2C3E50',
    dividerBg: '#E9ECEF',
    menuItemColor: '#6C757D',
    menuItemColorActive: '#2196F3',
    menuItemBg: '#FFFFFF',
    menuItemBgActive: '#E3F2FD',
    menuItemIconColor: '#6C757D',
    menuItemIconColorActive: '#2196F3',
    menuItemHeadingColor: '#2C3E50',
  },
  header: {
    height: '80px',
    background: '#5569ff',
    boxShadow: '#5569ff',
    textColor: '#ffffff'
  },
  footer: {
    height: '60px',
    background: '#ffffff',
    color: '#5569ff'
  },
}; 