import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';
import { ThemeName } from './themes';

export const ThemeContext = React.createContext(
  (themeName: ThemeName): void => {}
);

const ThemeProviderWrapper = (props) => {
  const curThemeName = (localStorage.getItem('appTheme') || 'PureLightTheme') as ThemeName;
  const [themeName, _setThemeName] = useState<ThemeName>(curThemeName);
  const theme = themeCreator(themeName);

  const setThemeName = (themeName: ThemeName): void => {
    console.log(themeName);
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
