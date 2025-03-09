import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { ExtendedThemeOptions } from '../types';
import { grey, brown } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ExtendedThemeOptions = {
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#4a4a4a',
      light: '#6b6b6b',
      dark: '#2d2d2d',
    },
    secondary: {
      main: '#8b4513',
      light: '#a0522d',
      dark: '#654321',
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
          backgroundColor: '#4a4a4a',
        },
      },
    },
  },
  colors: {
    gradients: {
      blue1: '#4a4a4a',
      blue2: '#6b6b6b',
      blue3: '#2d2d2d',
      blue4: '#8b4513',
      blue5: '#a0522d',
      orange1: '#8b4513',
      orange2: '#a0522d',
      orange3: '#654321',
      purple1: '#4a4a4a',
      purple3: '#6b6b6b',
      pink1: '#8b4513',
      pink2: '#a0522d',
      green1: '#4a4a4a',
      green2: '#6b6b6b',
      black1: '#000000',
      black2: '#121212',
    },
    shadows: {
      success: '#4a4a4a',
      error: '#8b4513',
      primary: '#4a4a4a',
      warning: '#8b4513',
      info: '#4a4a4a',
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
      lighter: '#6b6b6b',
      light: '#8b8b8b',
      main: '#4a4a4a',
      dark: '#2d2d2d',
    },
    secondary: {
      lighter: '#a0522d',
      light: '#b87333',
      main: '#8b4513',
      dark: '#654321',
    },
    success: {
      lighter: '#6b6b6b',
      light: '#8b8b8b',
      main: '#4a4a4a',
      dark: '#2d2d2d',
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
      lighter: '#6b6b6b',
      light: '#8b8b8b',
      main: '#4a4a4a',
      dark: '#2d2d2d',
    },
    custom: {
      darkBlue: '#4a4a4a',
      lightBlue: '#6b6b6b',
      pink: '#8b4513',
    },
  },
  general: {
    reactFrameworkColor: '#4a4a4a',
    borderRadiusSm: '4px',
    borderRadius: '8px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px',
  },
  sidebar: {
    background: '#424242',
    boxShadow: '#212121',
    width: '280px',
    right: '0',
    left: 'auto',
    textColor: '#fafafa',
    dividerBg: '#212121',
    menuItemColor: '#bdbdbd',
    menuItemColorActive: '#bcaaa4',
    menuItemBg: '#424242',
    menuItemBgActive: '#212121',
    menuItemIconColor: '#bdbdbd',
    menuItemIconColorActive: '#bcaaa4',
    menuItemHeadingColor: '#fafafa',
  },
  header: {
    height: '64px',
    background: '#4a4a4a',
    boxShadow: '#2d2d2d',
    textColor: '#ffffff',
  },
  footer: {
    height: '48px',
    background: '#4a4a4a',
    color: '#ffffff',
  },
};

export const MilitaryTheme = createTheme(baseThemeOptions as ThemeOptions); 