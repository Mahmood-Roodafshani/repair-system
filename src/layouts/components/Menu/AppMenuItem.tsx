import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { MenuItemDto } from "./MenuItemDto";
import { Collapse } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const StyledMenuItemRoot = styled('div')(({ theme }) => ({
    '&.active': {
        background: 'rgba(0, 0, 0, 0.08)',
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
    },
}));

const MenuItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.text.secondary,
    opacity: 0.7,
}));

const MenuItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.text.primary,
    textAlign: 'right',
}));

export type AppMenuItemProps = {
    drawerOpen?: boolean;
    item: MenuItemDto;
}

const AppMenuItem: React.FC<AppMenuItemProps> = props => {
    const { item } = props;
    const navigate = useNavigate();
    const isExpandable = item.items && item.items.length > 0;

    function handleClick() {
        if (props.drawerOpen == undefined || !!props.drawerOpen) {
            if (item.isOpen == undefined) {
                item.isOpen = !!item.isOpen;
            }
            item.isOpen = !item.isOpen;
        }
    }

    function handleNavigation() {
        if (item.link) {
            navigate(item.link);
        }
    }

    function menuShouldOpen() {
        return (props.drawerOpen == undefined || props.drawerOpen) && item.isOpen;
    }

    const MenuItemRoot = (
        <StyledMenuItemRoot className={props.drawerOpen ? 'active' : ''}>
            <List
                component="div"
                onClick={isExpandable ? handleClick : handleNavigation}
                sx={{ cursor: 'pointer' }}
            >
                <MenuItemIcon>
                    {item.icon && <item.icon />}
                </MenuItemIcon>
                <MenuItemText primary={item.title} />
                {isExpandable && !item.isOpen && <ExpandMore />}
                {isExpandable && item.isOpen && <ExpandLess />}
            </List>
        </StyledMenuItemRoot>
    );

    const MenuItemChildren = isExpandable ? (
        <Collapse in={menuShouldOpen()} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {item.items?.map((item2, index) => (
                    <AppMenuItem item={item2} key={index} drawerOpen={props.drawerOpen} />
                ))}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    );
};

export default AppMenuItem; 