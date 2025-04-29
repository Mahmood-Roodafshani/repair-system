import { Box, Button, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { TextFieldFormik } from '@/components/form/TextFieldFormik';
import { GetItemListInCommissionQueueRequest } from '@/types/requests/repairPanel/commission/getItemListInCommissionQueueRequest';
import { filterValidationSchema } from '@/validation/commission/filterValidationSchema';

interface FilterFormProps {
  onSubmit: (values: GetItemListInCommissionQueueRequest) => void;
}

export const FilterForm = ({ onSubmit }: FilterFormProps) => {
  const initialValues: GetItemListInCommissionQueueRequest = {
    assetNumber: '',
    submitNumber: '',
    submitAt: undefined,
    date: undefined,
    description: '',
    category: '',
    submitter: '',
    submitterUnit: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={filterValidationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextFieldFormik name="assetNumber" label="Asset Number" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextFieldFormik name="submitNumber" label="Submit Number" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextFieldFormik name="description" label="Description" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextFieldFormik name="category" label="Category" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextFieldFormik name="submitter" label="Submitter" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextFieldFormik name="submitterUnit" label="Organization Unit" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextFieldFormik name="submitAt" label="Submit From" type="date" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextFieldFormik name="date" label="Submit To" type="date" />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
                Search
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}; 