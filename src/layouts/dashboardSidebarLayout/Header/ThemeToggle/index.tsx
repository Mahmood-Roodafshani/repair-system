import { useContext, useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { ThemeContext } from 'src/theme/ThemeProvider';
import { ThemeName } from 'src/theme/themes';

const themeOptions = [
  {
    name: 'PureLightTheme',
    label: 'Light Theme',
    icon: <LightModeIcon fontSize="small" />
  },
  {
    name: 'PureDarkTheme',
    label: 'Dark Theme',
    icon: <DarkModeIcon fontSize="small" />
  },
  {
    name: 'MilitaryTheme',
    label: 'Military Theme',
    icon: <MilitaryTechIcon fontSize="small" />
  }
] as const;

function ThemeToggle() {
  const theme = useTheme();
  const { setThemeName } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newTheme: ThemeName) => {
    setThemeName(newTheme);
    handleClose();
  };

  const getCurrentThemeIcon = () => {
    const currentTheme = localStorage.getItem('appTheme') || 'PureLightTheme';
    const themeOption = themeOptions.find(option => option.name === currentTheme);
    return themeOption?.icon || <LightModeIcon fontSize="small" />;
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={handleClick}
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {getCurrentThemeIcon()}
      </IconButton>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
      >
        {themeOptions.map((option) => (
          <MenuItem 
            key={option.name}
            onClick={() => handleThemeChange(option.name)}
            selected={theme.palette.mode === (option.name === 'PureDarkTheme' ? 'dark' : 'light') && 
                     (option.name === 'MilitaryTheme' ? theme.palette.primary.main === '#02402B' : true)}
          >
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ThemeToggle; 