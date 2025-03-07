import { useContext } from 'react';
import { Box, IconButton, alpha, styled, useTheme } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${alpha(theme.colors.alpha.trueWhite[100], 0.2)};
  color: ${theme.colors.alpha.trueWhite[70]};
  padding: 0;
  position: absolute;
  top: ${theme.spacing(10)};
  left: -${theme.spacing(4)};
  z-index: 10;
  border-radius: 50%;
  box-shadow: ${theme.sidebar.boxShadow};
  transition: ${theme.transitions.create(['background', 'transform'])};

  &:hover {
    background: ${alpha(theme.colors.alpha.trueWhite[100], 0.3)};
  }
`
);

function SidebarToggle() {
  const { toggleSidebar, sidebarToggle } = useContext(SidebarContext);
  const theme = useTheme();

  return (
    <IconButtonToggle onClick={toggleSidebar}>
      {sidebarToggle ? <ChevronRightTwoToneIcon /> : <ChevronLeftTwoToneIcon />}
    </IconButtonToggle>
  );
}

export default SidebarToggle; 