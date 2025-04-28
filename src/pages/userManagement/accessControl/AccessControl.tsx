import { Box, Button, Grid, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextFieldFormik } from '../../../components/form/TextFieldFormik';
import { AccessControlRequest } from '../../../types/requests/userManagement/accessControl/accessControlRequest';
import { accessControlValidationSchema } from '../../../validation/userManagement/accessControl/accessControlValidationSchema';

function AccessControl() {
  const { t } = useTranslation();

  const initialValues: AccessControlRequest = {
    staffCode: '',
    grants: []
  };

  const onSubmit = (values: AccessControlRequest) => {
    console.log(values);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('access_control')}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={accessControlValidationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextFieldFormik
                  name="staffCode"
                  label={t('staff_code')}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {t('search')}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default AccessControl;
