import { Grid, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Button, ButtonType } from 'src/mahmood-components';

function OpGrid({
  sx,
  onSearch,
  onClear,
  onCreateOrEdit,
  onCreateOrEditLabel,
  onClose,
  additionalBtn
}: {
  sx?: SxProps<Theme>;
  onSearch?: () => void;
  onClear?: () => void;
  onCreateOrEdit?: () => void;
  onCreateOrEditLabel?: string;
  onClose?: () => void;
  additionalBtn?: React.ReactNode;
}) {
  return (
    <Grid sx={sx} display={'flex'} flexDirection={'row'} gap={'10px'}>
      {onSearch && (
        <Button
          variant="contained"
          color="success"
          buttonType={ButtonType.SEARCH}
          showIcon={false}
          onClick={onSearch}
        />
      )}
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
          text={onCreateOrEditLabel}
          buttonType={ButtonType.CREATEOREDIT}
          showIcon={false}
          onClick={onCreateOrEdit}
        />
      )}
      {additionalBtn}
      {onClose && (
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          buttonType={ButtonType.CLOSE}
        />
      )}
    </Grid>
  );
}

export default OpGrid;
