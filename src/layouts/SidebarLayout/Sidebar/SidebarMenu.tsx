import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Tooltip, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { MenuService } from '../../components/Menu/MenuService';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useMenu } from '../../../contexts/MenuContext';

const SIDEBAR_WIDTH = 240;
const MENU_PADDING = 20;

interface SidebarMenuProps {
  isCollapsed: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isCollapsed }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { visibleSection } = useMenu();

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

  const getFilteredMenuItems = (items: any[]) => {
    if (visibleSection === 'all') return items;

    return items.filter(item => {
      if (item.title === 'داشبورد') return true;

      return item.section === visibleSection;
    });
  };

  const renderMenuItem = (item: any, level = 0) => {
    const isExpandable = item.items && item.items.length > 0;
    const isOpen = openItems.includes(item.title);

    const menuItem = (
      <ListItemButton
        onClick={() => isExpandable && handleClick(item.title)}
        component={isExpandable ? 'div' : NavLink}
        to={isExpandable ? undefined : item.link}
        sx={{
          pl: `${MENU_PADDING + level * 20}px`,
          pr: `${MENU_PADDING}px`,
          py: 1,
          '&.active': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
          }
        }}
      >
        <ListItemIcon>
          {item.icon && <item.icon />}
        </ListItemIcon>
        {!isCollapsed && (
          <>
            <ListItemText primary={item.title} />
            {isExpandable && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </>
        )}
      </ListItemButton>
    );

    const wrappedMenuItem = isCollapsed ? (
      <Tooltip title={item.title} placement="right" arrow>
        {menuItem}
      </Tooltip>
    ) : menuItem;

    return (
      <React.Fragment key={item.title}>
        {wrappedMenuItem}
        {isExpandable && !isCollapsed && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.items.map((subItem: any) => renderMenuItem(subItem, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <List component="nav" sx={{ width: '100%', p: 0 }}>
      {getFilteredMenuItems(menuItems).map((item) => renderMenuItem(item))}
    </List>
  );
};

export default SidebarMenu; 