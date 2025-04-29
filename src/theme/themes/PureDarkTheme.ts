import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { ExtendedThemeOptions } from '../types';
import { ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ExtendedThemeOptions = {
  direction: 'rtl',
  palette: {
    mode: 'dark',
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
          backgroundColor: '#1e1e1e',
        },
      },
    },
  },
  colors: {
    gradients: {
      blue1: '#90caf9',
      blue2: '#e3f2fd',
      blue3: '#42a5f5',
      blue4: '#bbdefb',
      blue5: '#e3f2fd',
      orange1: '#ff9800',
      orange2: '#ffb74d',
      orange3: '#f57c00',
      purple1: '#ce93d8',
      purple3: '#e1bee7',
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
      primary: '#90caf9',
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
      lighter: '#e3f2fd',
      light: '#bbdefb',
      main: '#90caf9',
      dark: '#42a5f5',
    },
    secondary: {
      lighter: '#f3e5f5',
      light: '#e1bee7',
      main: '#ce93d8',
      dark: '#ab47bc',
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
      darkBlue: '#90caf9',
      lightBlue: '#e3f2fd',
      pink: '#e91e63',
    },
  },
  general: {
    reactFrameworkColor: '#90caf9',
    borderRadiusSm: '4px',
    borderRadius: '8px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px',
  },
  sidebar: {
    background: '#212121',
    boxShadow: '#212121',
    width: '280px',
    right: '0',
    left: 'auto',
    textColor: '#fafafa',
    dividerBg: '#424242',
    menuItemColor: '#bdbdbd',
    menuItemColorActive: '#90caf9',
    menuItemBg: '#212121',
    menuItemBgActive: '#424242',
    menuItemIconColor: '#bdbdbd',
    menuItemIconColorActive: '#90caf9',
    menuItemHeadingColor: '#f5f5f5',
  },
  header: {
    height: '64px',
    background: '#1e1e1e',
    boxShadow: '#121212',
    textColor: '#ffffff',
  },
  footer: {
    height: '48px',
    background: '#1e1e1e',
    color: '#ffffff',
  },
};

const theme = createTheme(baseThemeOptions as ThemeOptions);
export const PureDarkTheme = responsiveFontSizes(theme); 