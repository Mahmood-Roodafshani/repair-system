import React from 'react';
import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material/styles';

interface CustomThemeColors {
  gradients: {
    blue1: string;
    blue2: string;
    blue3: string;
    blue4: string;
    blue5: string;
    orange1: string;
    orange2: string;
    orange3: string;
    purple1: string;
    purple3: string;
    pink1: string;
    pink2: string;
    green1: string;
    green2: string;
    black1: string;
    black2: string;
  };
  shadows: {
    success: string;
    error: string;
    primary: string;
    warning: string;
    info: string;
  };
  alpha: {
    white: {
      5: string;
      10: string;
      30: string;
      50: string;
      70: string;
      100: string;
    };
    trueWhite: {
      5: string;
      10: string;
      30: string;
      50: string;
      70: string;
      100: string;
    };
    black: {
      5: string;
      10: string;
      30: string;
      50: string;
      70: string;
      100: string;
    };
  };
  primary: {
    lighter: string;
    light: string;
    main: string;
    dark: string;
  };
  secondary: {
    lighter: string;
    light: string;
    main: string;
    dark: string;
  };
  success: {
    lighter: string;
    light: string;
    main: string;
    dark: string;
  };
  warning: {
    lighter: string;
    light: string;
    main: string;
    dark: string;
  };
  error: {
    lighter: string;
    light: string;
    main: string;
    dark: string;
  };
  info: {
    lighter: string;
    light: string;
    main: string;
    dark: string;
  };
  custom: {
    darkBlue: string;
    lightBlue: string;
    pink: string;
  };
}

interface CustomThemeExtensions {
  colors: CustomThemeColors;
  general: {
    reactFrameworkColor: React.CSSProperties['color'];
    borderRadiusSm: string;
    borderRadius: string;
    borderRadiusLg: string;
    borderRadiusXl: string;
  };
  sidebar: {
    background: string;
    boxShadow: string;
    width: string;
    right: string;
    left: string;
    textColor: string;
    dividerBg: string;
    menuItemColor: string;
    menuItemColorActive: string;
    menuItemBg: string;
    menuItemBgActive: string;
    menuItemIconColor: string;
    menuItemIconColorActive: string;
    menuItemHeadingColor: string;
  };
  header: {
    height: string;
    background: string;
    boxShadow: string;
    textColor: string;
  };
  footer: {
    height: string;
    background: string;
    color: string;
  };
}

declare module '@mui/material/styles' {
  interface Theme extends CustomThemeExtensions {}
  interface ThemeOptions extends Partial<CustomThemeExtensions> {}
}

export type Theme = MuiTheme & CustomThemeExtensions;

export type ThemeName = 'PureLightTheme' | 'PureDarkTheme' | 'MilitaryTheme' | 'CorporateTheme';

export interface ExtendedThemeOptions extends MuiThemeOptions {
  colors: CustomThemeColors;
  general: CustomThemeExtensions['general'];
  sidebar: CustomThemeExtensions['sidebar'];
  header: CustomThemeExtensions['header'];
  footer: CustomThemeExtensions['footer'];
}

// Export an empty object to make this file a module
export {}; 