import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, Grid } from '@mui/material';
import { i18n } from 'src/localization';
import { Button, ButtonType } from '@/components/form';

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
        <Button
          buttonType={ButtonType.CANCEL}
          showIcon={false}
          onClick={onClose}
          color="error"
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          color="success"
          onClick={onRemove}
        >
          {i18n.t('yes').toString()}
        </LoadingButton>
      </Grid>
    </Dialog>
  );
}

export default ConfirmationModal;
