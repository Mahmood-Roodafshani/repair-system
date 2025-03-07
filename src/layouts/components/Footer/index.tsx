import { Box, styled } from '@mui/material';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: ${theme.palette.background.paper};
        color: ${theme.palette.text.primary};
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: ${theme.zIndex.drawer + 1};
        padding: 0 ${theme.spacing(2)};
`
);

function Footer() {
  return (
    <FooterWrapper>
      © {new Date().getFullYear()} - سیستم تعمیرات
    </FooterWrapper>
  );
}

export default Footer; 