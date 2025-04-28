import { Box, Button, Grid, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { GetItemListInCommissionQueueRequest } from '../../../types/requests/repairPanel/commission/getItemListInCommissionQueueRequest';
import { filterValidationSchema } from '../../../validation/commission/filterValidationSchema';
import { TextFieldFormik } from '../../../components/form/TextFieldFormik';

function ItemsInCommissionQueue() {
  const { t } = useTranslation();

  const initialValues: GetItemListInCommissionQueueRequest = {
    assetNumber: '',
    submitNumber: '',
    submitAt: undefined,
    submitter: '',
    submitterUnit: '',
    description: '',
    category: '',
    status: '',
    page: 0,
    size: 10,
    sort: 'id,desc'
  };

  const onSubmit = (values: GetItemListInCommissionQueueRequest) => {
    console.log(values);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('items_in_commission_queue')}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={filterValidationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextFieldFormik
                  name="assetNumber"
                  label={t('asset_number')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFieldFormik
                  name="submitNumber"
                  label={t('submit_number')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFieldFormik
                  name="submitAt"
                  label={t('submit_at')}
                  type="date"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFieldFormik
                  name="submitter"
                  label={t('submitter')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFieldFormik
                  name="submitterUnit"
                  label={t('submitter_unit')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFieldFormik
                  name="description"
                  label={t('description')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFieldFormik
                  name="category"
                  label={t('category')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFieldFormik
                  name="status"
                  label={t('status')}
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

export default ItemsInCommissionQueue;
