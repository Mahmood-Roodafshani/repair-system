import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogTitle, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { storeNewRole } from 'src/service';

function CreateNewRoleDialog({
  systemId,
  open,
  onClose,
  onAdd
}: {
  systemId: number | string;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [roleName, setRoleName] = useState<string>();

  return (
    <Dialog sx={{ margin: '0 auto' }} onClose={onClose} open={open}>
      <DialogTitle>نقش</DialogTitle>
      <TextField
        required
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        label={'عنوان نقش'}
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
            if (!roleName || roleName?.length < 2) {
              toast.error('لطفا عنوان نقش را وارد نمایید');
              return;
            }
            setLoading(true);
            storeNewRole({ systemId: systemId, title: roleName })
              .then((res) => {
                if (res.statusCode === 200) {
                  toast.success('نقش مورد نظر با موفقیت افزوده شد');
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

export default CreateNewRoleDialog;
