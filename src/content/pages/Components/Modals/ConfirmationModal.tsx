import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogTitle, Grid } from '@mui/material';

function ConfirmationModal({
  onClose,
  onRemove,
  open,
  loading,
  message
}: {
  onClose: () => void;
  onRemove: () => void;
  open: boolean;
  loading: boolean;
  message: string;
}) {
  return (
    <Dialog sx={{ margin: '0 auto' }} onClose={onClose} open={open}>
      <DialogTitle>{message}</DialogTitle>
      <Grid
        display={'flex'}
        flexDirection={'row'}
        gap={'10px'}
        justifyContent={'end'}
      >
        <Button variant="outlined" color="error" onClick={onClose}>
          انصراف
        </Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="success"
          onClick={onRemove}
        >
          بله
        </LoadingButton>
      </Grid>
    </Dialog>
  );
}

export default ConfirmationModal;
