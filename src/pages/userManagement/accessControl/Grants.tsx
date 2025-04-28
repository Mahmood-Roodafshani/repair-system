import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { CustomRichTreeView } from 'src/components';
import { GrantRequest } from '../../../types/requests/userManagement/accessControl/grantRequest';
import { grantValidationSchema } from '../../../validation/userManagement/accessControl/grantValidationSchema';

interface GrantsProps {
  userId: string;
  onClose: () => void;
}

function Grants({ userId, onClose }: GrantsProps) {
  const { t } = useTranslation();

  const initialValues: GrantRequest = {
    userId,
    grants: []
  };

  const onSubmit = (values: GrantRequest) => {
    console.log(values);
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">{t('grants')}</Typography>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={grantValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ mt: 2 }}>
                <CustomRichTreeView
                  label={t('grants')}
                  items={[]}
                  onSelectedItemsChange={() => {}}
                  multiSelect
                  checkboxSelection
                />
              </Box>
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

export default Grants;
