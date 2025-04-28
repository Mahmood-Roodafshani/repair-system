import { Stack as MuiStack } from '@mui/material';
import { styled } from '@mui/material/styles';

const Stack = styled(MuiStack)(
  () => `
    margin-bottom: 16px;
`
);

export default Stack;