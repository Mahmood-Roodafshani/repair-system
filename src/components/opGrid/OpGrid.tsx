import { Grid, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Button, ButtonType } from 'src/mahmood-components';

function OpGrid({
  sx,
  onClear,
  onCreateOrEdit,
  onClose,
  additionalBtn
}: {
  sx?: SxProps<Theme>;
  onClear?: () => void;
  onCreateOrEdit?: () => void;
  onClose?: () => void;
  additionalBtn?: React.ReactNode;
}) {
  return (
    <Grid sx={sx} display={'flex'} flexDirection={'row'} gap={'10px'}>
      {onClear && (
        <Button
          variant="contained"
          color="warning"
          buttonType={ButtonType.CLEAR}
          showIcon={false}
          onClick={onClear}
        />
      )}
      {onCreateOrEdit && (
        <Button
          variant="outlined"
          color="primary"
          buttonType={ButtonType.CREATE_OR_EDIT}
          showIcon={false}
          onClick={onCreateOrEdit}
        />
      )}
      {onClose && (
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          buttonType={ButtonType.CLOSE}
        />
      )}
      {additionalBtn}
    </Grid>
  );
}

export default OpGrid;
