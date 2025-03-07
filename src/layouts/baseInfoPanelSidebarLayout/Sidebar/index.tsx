import { useContext } from 'react';
import { Button, List, ListItem } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from '../../../contexts/SidebarContext';
import { MenuWrapper } from '../../components/MenuWrapper';
import { SubMenuWrapper } from '../../components/SubMenuWrapper';

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
                  to="/base-info-panel/"
                >
                  سامانه اطلاعات پایه
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/base-info-panel/staff-info"
                >
                  اطلاعات پرسنل
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/base-info-panel/family-info"
                >
                  اطلاعات عائله
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/base-info-panel/other-info"
                >
                  اطلاعات غیر پرسنل
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
