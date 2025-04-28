import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { CustomRichTreeView } from 'src/components';
import { NewAccessRequest } from '../../../types/requests/userManagement/accessControl/newAccessRequest';
import { newAccessValidationSchema } from '../../../validation/userManagement/accessControl/newAccessValidationSchema';

interface NewAccessProps {
  onClose: () => void;
  onSubmit: () => void;
}

function NewAccess({ onClose, onSubmit }: NewAccessProps) {
  const { t } = useTranslation();

  const initialValues: NewAccessRequest = {
    staffCode: '',
    grants: []
  };

  const handleSubmit = (values: NewAccessRequest) => {
    console.log(values);
    onSubmit();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">{t('new_access')}</Typography>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={newAccessValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomRichTreeView
                    label={t('grants')}
                    items={[]}
                    onSelectedItemsChange={() => {}}
                    multiSelect
                    checkboxSelection
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button type="submit" variant="contained" color="primary">
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewAccess;
