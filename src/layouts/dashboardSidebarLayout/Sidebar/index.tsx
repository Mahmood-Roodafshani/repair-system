import { useContext } from 'react';
import { Drawer, Box, styled } from '@mui/material';
import { SidebarContext, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED } from '../../../contexts/SidebarContext';
import SidebarMenu from './SidebarMenu';
import { useTheme } from '@mui/material/styles';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    width: ${SIDEBAR_WIDTH}px;
    min-width: ${SIDEBAR_WIDTH}px;
    color: ${theme.palette.text.primary};
    position: relative;
    z-index: 7;
    height: 100%;
    padding-bottom: 68px;
`
);

const StyledDrawer = styled(Drawer)(
  ({ theme }) => `
    width: ${SIDEBAR_WIDTH}px;
    min-width: ${SIDEBAR_WIDTH}px;
    position: relative;
    
    & .MuiDrawer-paper {
        width: ${SIDEBAR_WIDTH}px;
        min-width: ${SIDEBAR_WIDTH}px;
        background: ${theme.palette.background.default};
        color: ${theme.palette.text.primary};
        position: relative;
        transition: ${theme.transitions.create(['width', 'min-width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.shorter
        })};
    }
    
    &.collapsed {
        width: ${SIDEBAR_WIDTH_COLLAPSED}px;
        min-width: ${SIDEBAR_WIDTH_COLLAPSED}px;
        
        & .MuiDrawer-paper {
            width: ${SIDEBAR_WIDTH_COLLAPSED}px;
            min-width: ${SIDEBAR_WIDTH_COLLAPSED}px;
        }
    }
`
);

function Sidebar() {
  const { sidebarToggle } = useContext(SidebarContext);
  const theme = useTheme();
  
  return (
    <>
      <StyledDrawer
        variant="permanent"
        anchor="left"
        className={sidebarToggle ? '' : 'collapsed'}
        open={sidebarToggle}
      >
        <SidebarWrapper>
          <SidebarMenu />
        </SidebarWrapper>
      </StyledDrawer>
    </>
  );
}

export default Sidebar;
