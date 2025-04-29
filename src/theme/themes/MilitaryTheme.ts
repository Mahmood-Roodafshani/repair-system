import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { ExtendedThemeOptions } from '../types';
import { ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ExtendedThemeOptions = {
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#009db1',
      light: '#33b3c4',
      dark: '#007a8a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b4513',
      light: '#a0522d',
      dark: '#654321',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'IRANSans, Roboto, Arial',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#009db1',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#007a8a',
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
            '& .MuiListItemText-primary': {
              color: '#ffffff',
            },
          },
          '&.active': {
            backgroundColor: '#007a8a',
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
            '& .MuiListItemText-primary': {
              color: '#ffffff',
              fontWeight: 'bold',
            },
          },
        },
      },
    },
  },
  colors: {
    gradients: {
      blue1: '#009db1',
      blue2: '#33b3c4',
      blue3: '#007a8a',
      blue4: '#8b4513',
      blue5: '#a0522d',
      orange1: '#8b4513',
      orange2: '#a0522d',
      orange3: '#654321',
      purple1: '#009db1',
      purple3: '#33b3c4',
      pink1: '#8b4513',
      pink2: '#a0522d',
      green1: '#009db1',
      green2: '#33b3c4',
      black1: '#000000',
      black2: '#121212',
    },
    shadows: {
      success: '#009db1',
      error: '#8b4513',
      primary: '#009db1',
      warning: '#8b4513',
      info: '#009db1',
    },
    alpha: {
      white: {
        5: '#f5f5f5',
        10: '#e8e8e8',
        30: '#d1d1d1',
        50: '#b8b8b8',
        70: '#9e9e9e',
        100: '#ffffff',
      },
      trueWhite: {
        5: '#f5f5f5',
        10: '#e8e8e8',
        30: '#d1d1d1',
        50: '#b8b8b8',
        70: '#9e9e9e',
        100: '#ffffff',
      },
      black: {
        5: '#f5f5f5',
        10: '#e8e8e8',
        30: '#d1d1d1',
        50: '#b8b8b8',
        70: '#9e9e9e',
        100: '#000000',
      },
    },
    primary: {
      lighter: '#33b3c4',
      light: '#4dbccb',
      main: '#009db1',
      dark: '#007a8a',
    },
    secondary: {
      lighter: '#a0522d',
      light: '#b87333',
      main: '#8b4513',
      dark: '#654321',
    },
    success: {
      lighter: '#33b3c4',
      light: '#4dbccb',
      main: '#009db1',
      dark: '#007a8a',
    },
    warning: {
      lighter: '#a0522d',
      light: '#b87333',
      main: '#8b4513',
      dark: '#654321',
    },
    error: {
      lighter: '#a0522d',
      light: '#b87333',
      main: '#8b4513',
      dark: '#654321',
    },
    info: {
      lighter: '#33b3c4',
      light: '#4dbccb',
      main: '#009db1',
      dark: '#007a8a',
    },
    custom: {
      darkBlue: '#009db1',
      lightBlue: '#33b3c4',
      pink: '#8b4513',
    },
  },
  general: {
    reactFrameworkColor: '#009db1',
    borderRadiusSm: '4px',
    borderRadius: '8px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px',
  },
  sidebar: {
    background: '#009db1',
    boxShadow: '#007a8a',
    width: '280px',
    right: '0',
    left: 'auto',
    textColor: '#fafafa',
    dividerBg: '#007a8a',
    menuItemColor: '#e8e8e8',
    menuItemColorActive: '#ffffff',
    menuItemBg: '#009db1',
    menuItemBgActive: '#007a8a',
    menuItemIconColor: '#e8e8e8',
    menuItemIconColorActive: '#ffffff',
    menuItemHeadingColor: '#fafafa',
  },
  header: {
    height: '64px',
    background: '#009db1',
    boxShadow: '#007a8a',
    textColor: '#ffffff',
  },
  footer: {
    height: '48px',
    background: '#009db1',
    color: '#ffffff',
  },
};

const theme = createTheme(baseThemeOptions as ThemeOptions);
export const MilitaryTheme = responsiveFontSizes(theme); 