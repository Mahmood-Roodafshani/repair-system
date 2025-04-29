import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogTitle, DialogContent, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { roleManagementService } from 'src/services/userManagement/roleManagementService';
import { i18n } from 'src/localization';

interface CreateNewSystemDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

interface SystemFormData {
  name: string;
}

function CreateNewSystemDialog({ open, onClose, onAdd }: CreateNewSystemDialogProps) {
  const [loading, setLoading] = useState(false);
  const [systemName, setSystemName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateForm = (): boolean => {
    if (!systemName || systemName.length < 2) {
      setError(i18n.t('system_title_is_req').toString());
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData: SystemFormData = {
      name: systemName
    };

    setLoading(true);
    try {
      await roleManagementService.storeNewSystem(formData);
      toast.success(i18n.t('system_created_successfully').toString());
      onAdd();
      onClose();
    } catch (error) {
      console.error('Error creating system:', error);
      toast.error(i18n.t('error_creating_system').toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      sx={{ margin: '0 auto' }} 
      onClose={onClose} 
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{i18n.t('new_system').toString()}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              value={systemName}
              onChange={(e) => {
                setSystemName(e.target.value);
                if (error) validateForm();
              }}
              label={i18n.t('system_title').toString()}
              error={!!error}
              helperText={error}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              display={'flex'}
              flexDirection={'row'}
              gap={'10px'}
              justifyContent={'end'}
            >
              <Button 
                variant="outlined" 
                color="error" 
                onClick={onClose}
                disabled={loading}
              >
                {i18n.t('cancel').toString()}
              </Button>
              <LoadingButton
                loading={loading}
                variant="contained"
                color="success"
                onClick={handleSubmit}
                disabled={!systemName || systemName.length < 2}
              >
                {i18n.t('save').toString()}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewSystemDialog;
