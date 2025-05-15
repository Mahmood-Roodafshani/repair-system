import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField
} from '@mui/material';
import { Form, Formik } from 'formik';
import { Button, ButtonType } from '@/components/form';
import { i18n } from 'src/localization';
import { toast } from 'react-toastify';
import { permissionManagementService } from '@/services';
import { PermissionManagementDto } from '@/types';

interface EditPermissionDialogProps {
  permission: PermissionManagementDto;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

function EditPermissionDialog({
  permission,
  open,
  onClose,
  onUpdate
}: EditPermissionDialogProps) {
  const handleSubmit = async (values: PermissionManagementDto) => {
    try {
      await permissionManagementService.update(
        permission.id.toString(),
        values
      );
      toast.success(i18n.t('permission_updated_successfully'));
      onUpdate();
    } catch (error) {
      console.error('Error updating permission:', error);
      toast.error(i18n.t('error_updating_permission'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{i18n.t('edit_permission')}</DialogTitle>
      <Formik initialValues={permission} onSubmit={handleSubmit}>
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={i18n.t('permission_id')}
                    name="id"
                    value={values.id}
                    onChange={handleChange}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={i18n.t('permission_name')}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={i18n.t('description')}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button buttonType={ButtonType.CLOSE} onClick={onClose} />
              <Button
                buttonType={ButtonType.ACCEPT}
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
              />
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default EditPermissionDialog;
