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
  Backdrop,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  MilitaryTech as MilitaryIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useThemeContext } from '../../../theme/ThemeProvider';
import { ThemeName } from '../../../theme/themes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success('خروج موفقیت‌آمیز');
    handleUserMenuClose();
    navigate('/login');
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
    <>
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
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <LightModeIcon sx={{ ml: 1 }} />
                  <Typography>تم روشن</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={() => handleThemeChange('PureDarkTheme')}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <DarkModeIcon sx={{ ml: 1 }} />
                  <Typography>تم تاریک</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={() => handleThemeChange('MilitaryTheme')}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <MilitaryIcon sx={{ ml: 1 }} />
                  <Typography>تم نظامی</Typography>
                </Box>
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
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 180,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <MenuItem onClick={handleUserMenuClose}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <PersonIcon sx={{ ml: 1 }} />
                  <Typography>پروفایل</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <LogoutIcon sx={{ ml: 1 }} />
                  <Typography>خروج</Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: theme.zIndex.drawer + 2,
          backdropFilter: 'blur(4px)',
        }}
        open={Boolean(userAnchorEl)}
        onClick={handleUserMenuClose}
      />
    </>
  );
};

export default Header; 