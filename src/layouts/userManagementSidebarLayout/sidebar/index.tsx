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
                  to="/user-management/"
                >
                  مدیریت کاربران
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/usermanagement/accessControl"
                >
                  مدیریت دسترسی
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/usermanagement/roleManagement"
                >
                  مدیریت نقش
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/usermanagement/create-group-access"
                >
                  ایجاد گروه دسترسی
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/usermanagement/security-announcement"
                >
                  اطلاع رسانی امنیتی
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/usermanagement/public-announcement"
                >
                  اطلاع رسانی عمومی
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/usermanagement/choose-replacement"
                >
                  انتخاب جایگزین
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="/usermanagement/signiture"
                >
                  نمونه امضا
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
