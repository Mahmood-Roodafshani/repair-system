import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Tooltip, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { MenuService } from '../../components/Menu/MenuService';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SIDEBAR_WIDTH = 240;
const MENU_PADDING = 20; // Consistent padding

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

  const renderMenuItem = (item: any, isSubItem = false) => {
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
          px: MENU_PADDING / 8, // Convert to MUI spacing units
          overflow: 'hidden',
          transition: 'none !important',
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
          },
          ...(isSubItem && {
            pr: MENU_PADDING / 8,
          }),
        }}
      >
        <ListItemIcon 
          sx={{
            minWidth: 0,
            position: 'absolute',
            right: MENU_PADDING,
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
          right: MENU_PADDING * 2,
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

  return (
    <List 
      component="nav" 
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        '& *': { transition: 'none !important' }
      }}
    >
      {menuItems.map((item) => {
        const isExpandable = item.items && item.items.length > 0;
        const isOpen = openItems.includes(item.title);

        return (
          <React.Fragment key={item.title}>
            {renderMenuItem(item)}
            {!isCollapsed && isExpandable && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.items.map((subItem: any) => renderMenuItem(subItem, true))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default SidebarMenu; 