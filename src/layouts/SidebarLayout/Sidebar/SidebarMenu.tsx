import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Tooltip, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { MenuService } from '../../components/Menu/MenuService';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SIDEBAR_WIDTH = 240;
const MENU_PADDING = 20;

interface SidebarMenuProps {
  isCollapsed: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isCollapsed }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleClick = (title: string) => {
    if (!isCollapsed) {
      setOpenItems(prev => 
        prev.includes(title) 
          ? prev.filter(item => item !== title)
          : [...prev, title]
      );
    }
  };

  const menuItems = MenuService.getAppMenuList();

  const renderMenuItem = (item: any, level = 0) => {
    const isExpandable = item.items && item.items.length > 0;
    const isOpen = openItems.includes(item.title);

    const menuItem = (
      <ListItemButton
        onClick={() => isExpandable && handleClick(item.title)}
        component={isExpandable ? 'div' : NavLink}
        to={isExpandable ? undefined : item.link}
        sx={{
          minHeight: 48,
          position: 'relative',
          justifyContent: 'flex-end',
          px: MENU_PADDING / 8,
          overflow: 'hidden',
          transition: 'none !important',
          pr: `${MENU_PADDING + (level * 16)}px`,
          '& *': {
            transition: 'none !important'
          },
          '&.active': {
            backgroundColor: 'action.selected',
            '& .MuiListItemIcon-root': {
              color: 'primary.main',
            },
            '& .MuiListItemText-primary': {
              color: 'primary.main',
              fontWeight: 'bold',
            },
            '&::after': {
              backgroundColor: 'primary.main',
            }
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 3,
            backgroundColor: 'transparent',
            transition: 'background-color 0.2s',
          },
          '&:hover::after': {
            backgroundColor: 'primary.light',
          },
          '&.active::after': {
            backgroundColor: 'primary.main',
          }
        }}
      >
        <ListItemIcon 
          sx={{
            minWidth: 0,
            position: 'absolute',
            right: `${MENU_PADDING + (level * 16)}px`,
            justifyContent: 'center',
            transform: 'none !important',
          }}
        >
          {item.icon && <item.icon />}
        </ListItemIcon>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          width: SIDEBAR_WIDTH - (MENU_PADDING * 2),
          position: 'absolute',
          right: `${MENU_PADDING * 2 + (level * 16)}px`,
          pr: MENU_PADDING / 4,
          transform: 'none !important',
          pointerEvents: isCollapsed ? 'none' : 'auto',
        }}>
          <ListItemText 
            primary={item.title}
            sx={{ 
              margin: 0,
              transform: 'none !important',
              '& .MuiListItemText-primary': {
                textAlign: 'right',
                transform: 'none !important',
              }
            }} 
          />
          {isExpandable && (
            <Box sx={{ ml: 1, transform: 'none !important' }}>
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </Box>
          )}
        </Box>
      </ListItemButton>
    );

    return isCollapsed ? (
      <Tooltip title={item.title} placement="left" key={item.title}>
        {menuItem}
      </Tooltip>
    ) : menuItem;
  };

  const renderMenuItems = (items: any[], level = 0) => {
    return items.map((item) => {
      const isExpandable = item.items && item.items.length > 0;
      const isOpen = openItems.includes(item.title);

      return (
        <React.Fragment key={item.title}>
          {renderMenuItem(item, level)}
          {!isCollapsed && isExpandable && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.items, level + 1)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <List 
      component="nav" 
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        '& *': { transition: 'none !important' }
      }}
    >
      {renderMenuItems(menuItems)}
    </List>
  );
};

export default SidebarMenu; 