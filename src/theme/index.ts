import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  direction: 'rtl',
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
          },
          secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
        }
      : {
          primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
          },
          secondary: {
            main: '#ce93d8',
            light: '#f3e5f5',
            dark: '#ab47bc',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
  typography: {
    fontFamily: 'IRANSans, Roboto, Arial',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
        },
      },
    },
  },
  colors: {
    gradients: {
      blue1: '#1976d2',
      blue2: '#42a5f5',
      blue3: '#1565c0',
      blue4: '#90caf9',
      blue5: '#e3f2fd',
      orange1: '#ff9800',
      orange2: '#ffb74d',
      orange3: '#f57c00',
      purple1: '#9c27b0',
      purple3: '#ba68c8',
      pink1: '#e91e63',
      pink2: '#f48fb1',
      green1: '#4caf50',
      green2: '#81c784',
      black1: '#000000',
      black2: '#121212',
    },
    shadows: {
      success: '#4caf50',
      error: '#f44336',
      primary: '#1976d2',
      warning: '#ff9800',
      info: '#2196f3',
    },
    alpha: {
      white: {
        5: '#f3f4f6',
        10: '#f9fafb',
        30: '#f3f4f6',
        50: '#f9fafb',
        70: '#f3f4f6',
        100: '#ffffff',
      },
      trueWhite: {
        5: '#f3f4f6',
        10: '#f9fafb',
        30: '#f3f4f6',
        50: '#f9fafb',
        70: '#f3f4f6',
        100: '#ffffff',
      },
      black: {
        5: '#f3f4f6',
        10: '#f9fafb',
        30: '#f3f4f6',
        50: '#f9fafb',
        70: '#f3f4f6',
        100: '#000000',
      },
    },
    primary: {
      lighter: mode === 'light' ? '#42a5f5' : '#e3f2fd',
      light: mode === 'light' ? '#64b5f6' : '#bbdefb',
      main: mode === 'light' ? '#1976d2' : '#90caf9',
      dark: mode === 'light' ? '#1565c0' : '#42a5f5',
    },
    secondary: {
      lighter: mode === 'light' ? '#ba68c8' : '#f3e5f5',
      light: mode === 'light' ? '#ce93d8' : '#e1bee7',
      main: mode === 'light' ? '#9c27b0' : '#ce93d8',
      dark: mode === 'light' ? '#7b1fa2' : '#ab47bc',
    },
    success: {
      lighter: '#81c784',
      light: '#a5d6a7',
      main: '#4caf50',
      dark: '#388e3c',
    },
    warning: {
      lighter: '#ffb74d',
      light: '#ffcc80',
      main: '#ff9800',
      dark: '#f57c00',
    },
    error: {
      lighter: '#ef5350',
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    info: {
      lighter: '#64b5f6',
      light: '#90caf9',
      main: '#2196f3',
      dark: '#1976d2',
    },
    custom: {
      darkBlue: '#1976d2',
      lightBlue: '#42a5f5',
      pink: '#e91e63',
    },
  },
  general: {
    reactFrameworkColor: mode === 'light' ? '#1976d2' : '#90caf9',
    borderRadiusSm: '4px',
    borderRadius: '8px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px',
  },
  sidebar: {
    background: mode === 'light' ? '#ffffff' : '#1e1e1e',
    boxShadow: mode === 'light' ? '#f3f4f6' : '#121212',
    width: '280px',
    right: '0',
    left: 'auto',
    textColor: mode === 'light' ? '#000000' : '#ffffff',
    dividerBg: mode === 'light' ? '#f3f4f6' : '#2d2d2d',
    menuItemColor: mode === 'light' ? '#666666' : '#999999',
    menuItemColorActive: mode === 'light' ? '#1976d2' : '#90caf9',
    menuItemBg: mode === 'light' ? '#ffffff' : '#1e1e1e',
    menuItemBgActive: mode === 'light' ? '#e3f2fd' : '#1a237e',
    menuItemIconColor: mode === 'light' ? '#666666' : '#999999',
    menuItemIconColorActive: mode === 'light' ? '#1976d2' : '#90caf9',
    menuItemHeadingColor: mode === 'light' ? '#333333' : '#cccccc',
  },
  header: {
    height: '64px',
    background: mode === 'light' ? '#ffffff' : '#1e1e1e',
    boxShadow: mode === 'light' ? '#f3f4f6' : '#121212',
    textColor: mode === 'light' ? '#000000' : '#ffffff',
  },
  footer: {
    height: '64px',
    background: mode === 'light' ? '#ffffff' : '#1e1e1e',
    color: mode === 'light' ? '#000000' : '#ffffff',
  },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));

export const getTheme = (mode: PaletteMode) => {
  return createTheme(getDesignTokens(mode));
}; 