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
                  to="/repair-panel/"
                >
                  سامانه تعمیرات
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/cartable"
                >
                  کارتابل
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/repair-request"
                >
                  درخواست تعمیر
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/content-report"
                >
                  گزارش محتوا
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/group-performance-report"
                >
                  گزارش عملکرد یگانی
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/individual-performance-report"
                >
                  گزارش عملکرد فردی
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/technical-interface"
                >
                  رابط فنی
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/commission"
                >
                  کمیسیون
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/borrowed-items"
                >
                  اقلام امانی
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/items-list"
                >
                  لیست اقلام
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/companies"
                >
                  شرکت ها
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/group-property-code"
                >
                  اتصال کد اموال به گروه
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/missing-request"
                >
                  درخواست مفقودی
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/print-checkout"
                >
                  چاپ برگه خروج
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to="repair-panel/system-process"
                >
                  فرآیند سامانه
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
