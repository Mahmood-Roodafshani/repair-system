import { IconButton, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from 'src/theme/ThemeProvider';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { ThemeName } from 'src/theme/themes';

function ThemeToggle() {
  const { setTheme } = useContext(ThemeContext);
  const currentTheme = (localStorage.getItem('appTheme') || 'PureLightTheme') as ThemeName;

  const getNextTheme = () => {
    switch (currentTheme) {
      case 'PureLightTheme':
        return 'PureDarkTheme';
      case 'PureDarkTheme':
        return 'MilitaryTheme';
      case 'MilitaryTheme':
        return 'PureLightTheme';
      default:
        return 'PureLightTheme';
    }
  };

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'PureDarkTheme':
        return <Brightness4Icon />;
      case 'MilitaryTheme':
        return <MilitaryTechIcon />;
      default:
        return <Brightness7Icon />;
    }
  };

  const getNextThemeLabel = () => {
    switch (currentTheme) {
      case 'PureLightTheme':
        return 'تغییر به حالت تاریک';
      case 'PureDarkTheme':
        return 'تغییر به حالت نظامی';
      case 'MilitaryTheme':
        return 'تغییر به حالت روشن';
      default:
        return 'تغییر تم';
    }
  };

  const toggleTheme = () => {
    const nextTheme = getNextTheme();
    setTheme(nextTheme);
  };

  return (
    <Tooltip arrow title={getNextThemeLabel()}>
      <IconButton color="inherit" onClick={toggleTheme}>
        {getThemeIcon()}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle; 