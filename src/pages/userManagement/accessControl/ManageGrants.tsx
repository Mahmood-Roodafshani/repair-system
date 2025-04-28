import { Box, Button, Grid, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { CustomRichTreeView } from 'src/components';
import { ManageGrantsRequest } from '../../../types/requests/userManagement/accessControl/manageGrantsRequest';
import { manageGrantsValidationSchema } from '../../../validation/userManagement/accessControl/manageGrantsValidationSchema';

function ManageGrants() {
  const { t } = useTranslation();

  const initialValues: ManageGrantsRequest = {
    grants: []
  };

  const onSubmit = (values: ManageGrantsRequest) => {
    console.log(values);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('manage_grants')}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={manageGrantsValidationSchema}
        onSubmit={onSubmit}
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
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {t('save')}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default ManageGrants;
