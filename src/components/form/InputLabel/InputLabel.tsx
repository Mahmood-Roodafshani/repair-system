import { InputLabel as MuiInputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const InputLabel = styled(MuiInputLabel)(
  () => `
    margin-bottom: 8px;
    font-weight: 700;
    color: #223354;
`
);

export default InputLabel;