import { Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';

const Card = styled(MuiCard)(
  () => `
    position: relative;
    border-radius: 10px;
`
);

export default Card;