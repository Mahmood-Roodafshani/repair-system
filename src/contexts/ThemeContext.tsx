import React, { createContext } from 'react';
import { ThemeName } from '../theme/types';
import { useThemeContext as useCustomThemeContext } from '../theme/ThemeProvider';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'PureLightTheme',
  setTheme: () => {
  }
});

export const useThemeContext = () => {
  const customThemeContext = useCustomThemeContext();
  return {
    theme: customThemeContext.themeName,
    setTheme: customThemeContext.setTheme
  };
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeContext = useThemeContext();

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
}; 