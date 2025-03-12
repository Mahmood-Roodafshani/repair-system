import { FC, ElementType } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Tooltip } from '@mui/material';

interface SidebarMenuItemProps {
  name: string;
  link: string;
  icon: ElementType;
  collapsed: boolean;
}

const ListItemWrapper = styled(ListItem)(
  ({ theme }) => `
    padding: 0;
    margin: ${theme.spacing(0.5, 0)};
    width: 100%;

    .MuiButtonBase-root {
      position: relative;
      transition: ${theme.transitions.create(['all'])};
      color: ${theme.palette.text.secondary};
      padding: ${theme.spacing(1.2, 2)};
      width: 100%;
      border-radius: ${theme.shape.borderRadius}px;
      
      .MuiListItemIcon-root {
        transition: ${theme.transitions.create(['all'])};
        min-width: 36px;
        color: inherit;
      }
      
      .MuiListItemText-root {
        transition: ${theme.transitions.create(['opacity', 'transform'])};
        color: inherit;
        margin-left: 0;
        
        .MuiTypography-root {
          font-size: ${theme.typography.pxToRem(14)};
          font-weight: ${theme.typography.fontWeightMedium};
        }
      }

      &.active,
      &:hover {
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};

        .MuiListItemIcon-root {
          color: inherit;
        }
      }
    }
`
);

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  name,
  link,
  icon: Icon,
  collapsed
}) => {
  const button = (
    <ListItemButton
      component={RouterLink}
      to={link}
      sx={{
        minHeight: 44,
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 1.5 : 3
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: collapsed ? 0 : 2,
          justifyContent: 'center'
        }}
      >
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={name}
        sx={{
          opacity: collapsed ? 0 : 1,
          width: collapsed ? 0 : 'auto',
          transform: collapsed ? 'translateX(-10px)' : 'translateX(0)',
          transition: (theme) =>
            theme.transitions.create(['opacity', 'transform', 'width'], {
              duration: theme.transitions.duration.shorter
            })
        }}
      />
    </ListItemButton>
  );

  return (
    <ListItemWrapper>
      {collapsed ? (
        <Tooltip title={name} placement="right">
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </ListItemWrapper>
  );
};

export default SidebarMenuItem; 