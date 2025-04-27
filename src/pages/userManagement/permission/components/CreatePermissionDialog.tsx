import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { Button, ButtonType } from '@/components/form';
import { i18n } from 'src/localization';
import { permissionService } from 'src/services/userManagement/permissionService';
import { toast } from 'react-toastify';
import { PermissionDto } from 'src/types/responses/userManagement/roleManagement/permissionDto';

interface CreatePermissionDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

function CreatePermissionDialog({ open, onClose, onAdd }: CreatePermissionDialogProps) {
  const initialValues: Omit<PermissionDto, 'id'> = {
    name: '',
    description: ''
  };

  const handleSubmit = async (values: Omit<PermissionDto, 'id'>) => {
    try {
      console.log("Mahmood")
      await permissionService.create(values);
      toast.success(i18n.t('permission_created_successfully'));
      onAdd();
    } catch (error) {
      console.error('Error creating permission:', error);
      toast.error(i18n.t('error_creating_permission'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{i18n.t('new_permission')}</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
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
              <Button
                buttonType={ButtonType.CLOSE}
                onClick={onClose}
              />
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

export default CreatePermissionDialog; 