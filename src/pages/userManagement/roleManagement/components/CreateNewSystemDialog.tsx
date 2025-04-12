import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogTitle, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { storeNewSystem } from 'src/services';

function CreateNewSystemDialog({
  open,
  onClose,
  onAdd
}: {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [systemName, setSystemName] = useState<string>();

  return (
    <Dialog sx={{ margin: '0 auto' }} onClose={onClose} open={open}>
      <DialogTitle>سامانه جدید</DialogTitle>
      <TextField
        required
        value={systemName}
        onChange={(e) => setSystemName(e.target.value)}
        label={'عنوان سامانه'}
      />
      <Grid
        display={'flex'}
        flexDirection={'row'}
        gap={'10px'}
        justifyContent={'end'}
        mt={'10px'}
      >
        <Button variant="outlined" color="error" onClick={onClose}>
          انصراف
        </Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="success"
          onClick={async () => {
            if (!systemName || systemName?.length < 2) {
              toast.error('لطفا عنوان سامانه را وارد نمایید');
              return;
            }
            setLoading(true);
            storeNewSystem({ title: systemName })
              .then((res) => {
                if (res.statusCode === 200) {
                  toast.success('سامانه مورد نظر با موفقیت افزوده شد');
                  onAdd();
                }
              })
              .finally(() => setLoading(false));
          }}
        >
          ذخیره
        </LoadingButton>
      </Grid>
    </Dialog>
  );
}

export default CreateNewSystemDialog;
