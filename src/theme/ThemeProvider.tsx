import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeName } from './types';
import { PureLightTheme } from './themes/PureLightTheme';
import { PureDarkTheme } from './themes/PureDarkTheme';
import { MilitaryTheme } from './themes/MilitaryTheme';

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: React.Dispatch<React.SetStateAction<ThemeName>>;
  theme: typeof PureLightTheme;
  setTheme: (theme: ThemeName) => void;
}

const themeMap = {
  PureLightTheme,
  PureDarkTheme,
  MilitaryTheme,
} as const;

const defaultContext: ThemeContextType = {
  themeName: 'PureLightTheme',
  setThemeName: () => {},
  theme: PureLightTheme,
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const savedTheme = localStorage.getItem('themeName');
    return (savedTheme as ThemeName) || 'PureLightTheme';
  });

  useEffect(() => {
    localStorage.setItem('themeName', themeName);
  }, [themeName]);

  const currentTheme = themeMap[themeName];

  const setTheme = (newTheme: ThemeName) => {
    setThemeName(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, theme: currentTheme, setTheme }}>
      <MuiThemeProvider theme={currentTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
