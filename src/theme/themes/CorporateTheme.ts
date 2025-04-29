import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { ExtendedThemeOptions } from '../types';
import { ThemeOptions } from '@mui/material/styles';

const CorporateThemeOptions: ExtendedThemeOptions = {
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#2C3E50', // Deep blue-grey - professional and trustworthy
      light: '#34495E',
      dark: '#1A252F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#16A085', // Teal - modern and balanced
      light: '#1ABC9C',
      dark: '#0E6655',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FAFC', // Light grey-blue - subtle and professional
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
          backgroundColor: '#2C3E50',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: '0 4px 20px rgba(44, 62, 80, 0.1)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#34495E',
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
            '& .MuiListItemText-primary': {
              color: '#ffffff',
            },
          },
          '&.active': {
            backgroundColor: '#34495E',
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
      blue1: '#3498DB', // Bright blue
      blue2: '#2980B9', // Medium blue
      blue3: '#2C3E50', // Dark blue-grey
      blue4: '#34495E', // Medium blue-grey
      blue5: '#1A252F', // Darker blue-grey
      orange1: '#E67E22', // Warm orange
      orange2: '#D35400', // Dark orange
      orange3: '#C0392B', // Deep red-orange
      purple1: '#9B59B6', // Soft purple
      purple3: '#8E44AD', // Deep purple
      pink1: '#E91E63', // Modern pink
      pink2: '#D81B60', // Deep pink
      green1: '#16A085', // Teal
      green2: '#1ABC9C', // Light teal
      black1: '#2C3E50', // Corporate dark
      black2: '#1A252F', // Deeper dark
    },
    shadows: {
      success: '#16A085', // Teal
      error: '#E74C3C', // Soft red
      primary: '#2C3E50', // Deep blue-grey
      warning: '#F39C12', // Warm yellow
      info: '#3498DB', // Bright blue
    },
    alpha: {
      white: {
        5: 'rgba(255, 255, 255, 0.05)',
        10: 'rgba(255, 255, 255, 0.1)',
        30: 'rgba(255, 255, 255, 0.3)',
        50: 'rgba(255, 255, 255, 0.5)',
        70: 'rgba(255, 255, 255, 0.7)',
        100: '#ffffff',
      },
      trueWhite: {
        5: 'rgba(255, 255, 255, 0.05)',
        10: 'rgba(255, 255, 255, 0.1)',
        30: 'rgba(255, 255, 255, 0.3)',
        50: 'rgba(255, 255, 255, 0.5)',
        70: 'rgba(255, 255, 255, 0.7)',
        100: '#ffffff',
      },
      black: {
        5: 'rgba(44, 62, 80, 0.05)',
        10: 'rgba(44, 62, 80, 0.1)',
        30: 'rgba(44, 62, 80, 0.3)',
        50: 'rgba(44, 62, 80, 0.5)',
        70: 'rgba(44, 62, 80, 0.7)',
        100: '#2C3E50',
      },
    },
    primary: {
      lighter: '#34495E',
      light: '#2C3E50',
      main: '#2C3E50',
      dark: '#1A252F',
    },
    secondary: {
      lighter: '#1ABC9C',
      light: '#16A085',
      main: '#16A085',
      dark: '#0E6655',
    },
    success: {
      lighter: '#2ECC71',
      light: '#27AE60',
      main: '#27AE60',
      dark: '#219A52',
    },
    warning: {
      lighter: '#F1C40F',
      light: '#F39C12',
      main: '#F39C12',
      dark: '#D35400',
    },
    error: {
      lighter: '#E74C3C',
      light: '#C0392B',
      main: '#C0392B',
      dark: '#922B21',
    },
    info: {
      lighter: '#3498DB',
      light: '#2980B9',
      main: '#2980B9',
      dark: '#206694',
    },
    custom: {
      darkBlue: '#2C3E50',
      lightBlue: '#3498DB',
      pink: '#E91E63',
    },
  },
  general: {
    reactFrameworkColor: '#2C3E50',
    borderRadiusSm: '4px',
    borderRadius: '8px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px',
  },
  sidebar: {
    background: '#2C3E50',
    boxShadow: '0 0 15px rgba(44, 62, 80, 0.1)',
    width: '280px',
    right: '0',
    left: 'auto',
    textColor: '#ECF0F1',
    dividerBg: '#34495E',
    menuItemColor: '#ECF0F1',
    menuItemColorActive: '#ffffff',
    menuItemBg: 'transparent',
    menuItemBgActive: '#34495E',
    menuItemIconColor: '#ECF0F1',
    menuItemIconColorActive: '#ffffff',
    menuItemHeadingColor: '#ffffff',
  },
  header: {
    height: '64px',
    background: '#2C3E50',
    boxShadow: '0 2px 10px rgba(44, 62, 80, 0.1)',
    textColor: '#ffffff',
  },
  footer: {
    height: '48px',
    background: '#2C3E50',
    color: '#ECF0F1',
  },
};

const theme = createTheme(CorporateThemeOptions as ThemeOptions);
export const CorporateTheme = responsiveFontSizes(theme); 