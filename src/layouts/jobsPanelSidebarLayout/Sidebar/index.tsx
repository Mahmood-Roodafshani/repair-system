import { useContext } from 'react';
import { Button, List, ListItem } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from '../../../contexts/SidebarContext';
import { MenuWrapper } from 'src/layouts/components/MenuWrapper';
import { SubMenuWrapper } from 'src/layouts/components/SubMenuWrapper';

function SidebarMenu() {
  const { toggleSidebar } = useContext(SidebarContext);

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
                  onClick={toggleSidebar}
                  to="/jobs-panel/"
                >
                  سامانه مشاغل
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/jobs-panel/list"
                >
                  تعریف مشاغل
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/jobs-panel/tree"
                >
                  درختواره مشاغل
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
