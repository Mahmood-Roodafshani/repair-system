import { Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { ReactNode } from 'react';

function TableRowAction({
  onDelete,
  onEdit,
  additionalIconButton
}: {
  onDelete?: () => void;
  onEdit?: () => void;
  additionalIconButton?: ReactNode;
}) {
  return (
    <Grid display={'flex'} flexDirection={'row'} gap={'10px'}>
      {additionalIconButton !== undefined ? additionalIconButton : <></>}
      {onEdit && (
        <IconButton color="secondary" onClick={onEdit}>
          <Edit />
        </IconButton>
      )}
      {onDelete && (
        <IconButton color="error" onClick={onDelete}>
          <Delete />
        </IconButton>
      )}
    </Grid>
  );
}

export default TableRowAction;
