import { useContext } from 'react';
import { Button, List, ListItem } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { MenuWrapper } from 'src/layouts/components/MenuWrapper';
import { SubMenuWrapper } from 'src/layouts/components/SubMenuWrapper';

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/coding-panel/"
                >
                  سامانه کدینگ
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/coding-panel/coding"
                >
                  کدینگ
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/coding-panel/access"
                >
                  دسترسی کدینگ
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;