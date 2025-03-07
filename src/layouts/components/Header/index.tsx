import {
  alpha,
  Box,
  IconButton,
  styled,
  Tooltip,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { SidebarContext } from 'src/contexts/SidebarContext';
import ThemeToggle from './ThemeToggle';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        display: flex;
        align-items: center;
        box-shadow: ${theme.header.boxShadow};
`
);

const HeaderButtons = styled(Box)(
  ({ theme }) => `
        display: flex;
        align-items: center;
        gap: ${theme.spacing(1)};
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  return (
    <HeaderWrapper>
      <Box display="flex" alignItems="center">
        <Tooltip arrow title={sidebarToggle ? 'بستن منو' : 'باز کردن منو'}>
          <IconButton
            color="primary"
            onClick={toggleSidebar}
            edge="start"
            sx={{
              ml: 2,
              display: { lg: 'none', xs: 'inline-block' }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <HeaderButtons>
        <ThemeToggle />
      </HeaderButtons>
    </HeaderWrapper>
  );
}

export default Header; 