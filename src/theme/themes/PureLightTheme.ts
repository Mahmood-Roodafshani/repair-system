import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { ExtendedThemeOptions } from '../types';
import { ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ExtendedThemeOptions = {
  direction: 'rtl',
  palette: {
    mode: 'light',
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#ffffff',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#ffffff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: 'IRANSans, Roboto, Arial',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
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
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
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
          backgroundColor: '#ffffff',
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
      lighter: '#42a5f5',
      light: '#64b5f6',
      main: '#1976d2',
      dark: '#1565c0',
    },
    secondary: {
      lighter: '#ba68c8',
      light: '#ce93d8',
      main: '#9c27b0',
      dark: '#7b1fa2',
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
    reactFrameworkColor: '#1976d2',
    borderRadiusSm: '4px',
    borderRadius: '8px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px',
  },
  sidebar: {
    background: '#fafafa',
    boxShadow: '#f5f5f5',
    width: '280px',
    right: '0',
    left: 'auto',
    textColor: '#212121',
    dividerBg: '#f5f5f5',
    menuItemColor: '#616161',
    menuItemColorActive: '#1976d2',
    menuItemBg: '#fafafa',
    menuItemBgActive: '#f5f5f5',
    menuItemIconColor: '#616161',
    menuItemIconColorActive: '#1976d2',
    menuItemHeadingColor: '#212121',
  },
  header: {
    height: '64px',
    background: '#ffffff',
    boxShadow: '#f3f4f6',
    textColor: '#000000',
  },
  footer: {
    height: '48px',
    background: '#ffffff',
    color: '#000000',
  },
};

const theme = createTheme(baseThemeOptions as ThemeOptions);
export const PureLightTheme = responsiveFontSizes(theme); 