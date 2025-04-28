import { Paper as MuiPaper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Paper = styled(MuiPaper)(
  () => `
    padding: 32px;
    border-radius: 16px;
`
);

export default Paper;