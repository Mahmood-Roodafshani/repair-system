import { styled } from '@mui/material/styles';
import {
  Tooltip,
  TooltipProps,
  tooltipClasses
} from '@mui/material';
import { Link } from 'react-router-dom';
import logoImage from '@/assets/images/logo/material-ui.svg';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 100%;
        justify-content: center;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoImage = styled('img')(
  () => `
        width: 120px;
        height: auto;
        object-fit: contain;
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function Logo() {
  return (
    <TooltipWrapper title="متن پیشنهادی" arrow>
      <LogoWrapper to="/overview">
        <LogoImage src={logoImage} alt="Logo" />
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
