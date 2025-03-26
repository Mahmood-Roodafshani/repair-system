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
  MenuOpen as MenuOpenIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  MilitaryTech as MilitaryIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useThemeContext } from '../../../theme/ThemeProvider';
import { ThemeName } from '../../../theme/themes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface HeaderProps {
  onMenuClick: () => void;
  isCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isCollapsed }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { theme: currentTheme, setTheme, themeName } = useThemeContext();
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
    // Map theme names to their corresponding icons
    const themeIconMap = {
      PureLightTheme: <LightModeIcon />,
      PureDarkTheme: <DarkModeIcon />,
      MilitaryTheme: <MilitaryIcon />,
      CorporateTheme: <BusinessIcon />,
    } as const;
    
    // Return the corresponding icon or fallback to LightModeIcon
    return themeIconMap[themeName] || <LightModeIcon />;
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={onMenuClick}
              sx={{
                width: 40,
                height: 40,
                ml: 2,
                padding: '20px',
                '& .MuiSvgIcon-root': {
                  width: 24,
                  height: 24
                }
              }}
            >
              {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
            </IconButton>
          </Box>
          <Typography 
            variant="h6" 
            noWrap 
            component="div"
            sx={{ 
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            سامانه تعمیر و نگهداری
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
              <MenuItem onClick={() => handleThemeChange('CorporateTheme')}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <BusinessIcon sx={{ ml: 1 }} />
                  <Typography>تم سازمانی</Typography>
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