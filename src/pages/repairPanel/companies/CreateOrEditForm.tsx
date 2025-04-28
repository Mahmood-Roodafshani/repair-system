import { Box, Button, Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { i18n } from 'src/localization';
import { updateCompany, createCompany } from 'src/services';
import { CompaniesResponse, RichViewType } from 'src/types';
import { TextFieldFormik } from '@/components/form';
import { toast } from 'react-toastify';
import { createValidationSchema } from './validationSchema';

interface CompanyFormValues {
  name: string;
  activityField: string;
  tel: string;
  address: string;
  canBePartner: boolean;
  ceo: string;
  email: string;
  phone?: string;
}

interface CreateOrEditFormProps {
  activityFields: RichViewType[];
  existForm?: CompaniesResponse;
  onSuccess: () => void;
  onClose: () => void;
}

export default function CreateOrEditForm({
  existForm,
  onSuccess,
  onClose
}: CreateOrEditFormProps) {
  const onSubmit = async (
    values: CompanyFormValues,
    actions: FormikHelpers<CompanyFormValues>
  ) => {
    try {
      const companyData = {
        name: values.name,
        activityField: values.activityField,
        tel: values.tel,
        address: values.address,
        canBePartner: values.canBePartner,
        ceo: values.ceo,
        email: values.email,
        phone: values.phone || ''
      };

      if (existForm) {
        await updateCompany(existForm.id.toString(), companyData);
      } else {
        await createCompany(companyData);
      }

      toast.success(
        existForm
          ? i18n.t('company_updated').toString()
          : i18n.t('company_created').toString()
      );
      onSuccess();
    } catch (error) {
      toast.error(
        existForm
          ? i18n.t('company_update_failed').toString()
          : i18n.t('company_creation_failed').toString()
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {existForm ? i18n.t('edit_company') : i18n.t('new_company')}
      </Typography>
      <Formik<CompanyFormValues>
        onSubmit={onSubmit}
        initialValues={{
          name: existForm?.name || '',
          activityField: existForm?.activityField || '',
          tel: existForm?.tel || '',
          address: existForm?.address || '',
          canBePartner: existForm?.canBePartner || false,
          ceo: existForm?.ceo || '',
          email: existForm?.email || '',
          phone: existForm?.phone || ''
        }}
        validationSchema={createValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="name"
                  label={i18n.t('company_name').toString()}
                  error={!!(touched.name && errors.name)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="activityField"
                  label={i18n.t('activity_field').toString()}
                  error={!!(touched.activityField && errors.activityField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="tel"
                  label={i18n.t('tel').toString()}
                  error={!!(touched.tel && errors.tel)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="phone"
                  label={i18n.t('phone').toString()}
                  error={!!(touched.phone && errors.phone)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldFormik
                  name="address"
                  label={i18n.t('address').toString()}
                  error={!!(touched.address && errors.address)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="ceo"
                  label={i18n.t('ceo').toString()}
                  error={!!(touched.ceo && errors.ceo)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="email"
                  label={i18n.t('email').toString()}
                  error={!!(touched.email && errors.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    {i18n.t('cancel')}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {existForm ? i18n.t('update') : i18n.t('create')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
