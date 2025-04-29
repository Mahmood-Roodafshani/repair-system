import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppMenuItem from './AppMenuItem';
import { MenuService } from "./MenuService";
import { List } from '@mui/material';

const AppMenuRoot = styled(List)(() => ({
    width: '100%',
    padding: 0,
}));

interface AppMenuProps {
    drawerOpen: boolean;
}

const AppMenu: React.FC<AppMenuProps> = (props) => {
    return (
        <AppMenuRoot disablePadding>
            {MenuService.getAppMenuList().map((item, index) => (
                <AppMenuItem drawerOpen={props.drawerOpen} item={item} key={index} />
            ))}
        </AppMenuRoot>
    );
};

export default AppMenu; 