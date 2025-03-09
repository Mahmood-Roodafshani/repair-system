import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { MenuService } from '../../components/Menu/MenuService';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SidebarMenu: React.FC = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleClick = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const menuItems = MenuService.getAppMenuList();

  return (
    <List component="nav">
      {menuItems.map((item) => {
        const isExpandable = item.items && item.items.length > 0;
        const isOpen = openItems.includes(item.title);

        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              onClick={() => isExpandable && handleClick(item.title)}
              component={isExpandable ? 'div' : NavLink}
              to={isExpandable ? undefined : item.link}
              sx={{
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
              }}
            >
              <ListItemIcon>
                {item.icon && <item.icon />}
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {isExpandable && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {isExpandable && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.items.map((subItem) => (
                    <ListItemButton
                      key={subItem.title}
                      component={NavLink}
                      to={subItem.link}
                      sx={{
                        pl: 4,
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
                      }}
                    >
                      <ListItemIcon>
                        {subItem.icon && <subItem.icon />}
                      </ListItemIcon>
                      <ListItemText primary={subItem.title} />
                    </ListItemButton>
                  ))}
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