import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeName } from './types';
import { themeMap } from './themes';

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: React.Dispatch<React.SetStateAction<ThemeName>>;
  theme: typeof themeMap.PureLightTheme;
  setTheme: (theme: ThemeName) => void;
}

const defaultContext: ThemeContextType = {
  themeName: 'PureLightTheme',
  setThemeName: () => {},
  theme: themeMap.PureLightTheme,
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
