import { ThemeOptions } from '@mui/material';

export const MilitaryTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#02402B',
      light: '#668367',
      dark: '#002419',
      contrastText: '#FAEA0E',
    },
    secondary: {
      main: '#668367',
      light: '#86A387',
      dark: '#445744',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#84AD2D',
      light: '#A5D438',
      dark: '#5C7A1F',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FAEA0E',
      light: '#FFF176',
      dark: '#C7BC0C',
      contrastText: '#000000',
    },
    error: {
      main: '#FF1943',
      light: '#FF4D6E',
      dark: '#CC1436',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#33C2FF',
      light: '#5CD1FF',
      dark: '#2699CC',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#02402B',
      paper: '#033523'
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#02402B',
          color: '#FAEA0E',
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
  colors: {
    gradients: {
      blue1: '#02402B',
      blue2: '#668367',
      blue3: '#84AD2D',
      blue4: '#02402B',
      blue5: '#033523',
      orange1: '#FAEA0E',
      orange2: '#FFF176',
      orange3: '#C7BC0C',
      purple1: '#02402B',
      purple3: '#033523',
      pink1: '#FF1943',
      pink2: '#CC1436',
      green1: '#02402B',
      green2: '#033523',
      black1: '#002419',
      black2: '#001812',
    },
    shadows: {
      success: '0 0 20px rgba(132, 173, 45, 0.2)',
      error: '0 0 20px rgba(255, 25, 67, 0.2)',
      primary: '0 0 20px rgba(2, 64, 43, 0.2)',
      warning: '0 0 20px rgba(250, 234, 14, 0.2)',
      info: '0 0 20px rgba(51, 194, 255, 0.2)',
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
      lighter: '#668367',
      light: '#02402B',
      main: '#002419',
      dark: '#001812',
    },
    secondary: {
      lighter: '#86A387',
      light: '#668367',
      main: '#445744',
      dark: '#2A362A',
    },
    success: {
      lighter: '#A5D438',
      light: '#84AD2D',
      main: '#5C7A1F',
      dark: '#3C501A',
    },
    warning: {
      lighter: '#FFF176',
      light: '#FAEA0E',
      main: '#C7BC0C',
      dark: '#8C8408',
    },
    error: {
      lighter: '#FF4D6E',
      light: '#FF1943',
      main: '#CC1436',
      dark: '#990F29',
    },
    info: {
      lighter: '#5CD1FF',
      light: '#33C2FF',
      main: '#2699CC',
      dark: '#1B7399',
    },
    custom: {
      darkBlue: '#02402B',
      lightBlue: '#668367',
      pink: '#FF1943',
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
    background: '#02402B',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    width: '280px',
    right: '0',
    left: '0',
    textColor: '#FAEA0E',
    dividerBg: '#033523',
    menuItemColor: '#668367',
    menuItemColorActive: '#FAEA0E',
    menuItemBg: '#02402B',
    menuItemBgActive: '#033523',
    menuItemIconColor: '#668367',
    menuItemIconColorActive: '#FAEA0E',
    menuItemHeadingColor: '#FAEA0E',
  },
  header: {
    height: '64px',
    background: '#02402B',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    textColor: '#FAEA0E',
  },
  footer: {
    height: '60px',
    background: '#02402B',
    color: '#ffffff'
  },
}; 