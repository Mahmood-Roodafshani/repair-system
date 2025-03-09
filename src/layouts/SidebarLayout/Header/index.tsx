import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  MilitaryTech as MilitaryIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useThemeContext } from '../../../theme/ThemeProvider';
import { ThemeName } from '../../../theme/themes';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const { theme: currentTheme, setTheme } = useThemeContext();
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    handleThemeMenuClose();
  };

  const getThemeIcon = () => {
    switch (currentTheme.palette.mode) {
      case 'dark':
        return <DarkModeIcon />;
      case 'light':
        return currentTheme.palette.primary.main === '#02402B' ? <MilitaryIcon /> : <LightModeIcon />;
      default:
        return <LightModeIcon />;
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          سیستم تعمیرات
        </Typography>
        <Box>
          <IconButton
            size="large"
            aria-label="theme menu"
            aria-controls="theme-menu"
            aria-haspopup="true"
            onClick={handleThemeMenuOpen}
            color="inherit"
          >
            {getThemeIcon()}
          </IconButton>
          <Menu
            id="theme-menu"
            anchorEl={themeAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(themeAnchorEl)}
            onClose={handleThemeMenuClose}
          >
            <MenuItem onClick={() => handleThemeChange('PureLightTheme')}>
              <LightModeIcon sx={{ mr: 1 }} />
              تم روشن
            </MenuItem>
            <MenuItem onClick={() => handleThemeChange('PureDarkTheme')}>
              <DarkModeIcon sx={{ mr: 1 }} />
              تم تاریک
            </MenuItem>
            <MenuItem onClick={() => handleThemeChange('MilitaryTheme')}>
              <MilitaryIcon sx={{ mr: 1 }} />
              تم نظامی
            </MenuItem>
          </Menu>
          <IconButton
            size="large"
            aria-label="user menu"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleUserMenuOpen}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={userAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(userAnchorEl)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={handleUserMenuClose}>پروفایل</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>خروج</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 