import { Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { CustomRichTreeView, InlineLoader, OpGrid } from 'src/components';
import { i18n } from 'src/i18n';
import {
  RadioButtonGroupFormik,
  TextFieldFormik
} from 'src/mahmood-components';
import { createCompany, updateCompany } from 'src/service';
import {
  CompaniesResponse,
  CreateCompanyRequest,
  RichViewType
} from 'src/types';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import { createValidationSchema } from './validationSchema';
import { useState } from 'react';

function CreateOrEditForm({
  activityFields,
  existForm,
  onSuccess,
  onClose
}: {
  activityFields: RichViewType[];
  existForm?: CompaniesResponse;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const onSubmit = async (
    values: CreateCompanyRequest,
    actions: FormikHelpers<CreateCompanyRequest>
  ) => {
    const res = existForm
      ? await updateCompany({ form: values, companyId: existForm.id })
      : await createCompany(values);
    actions.setSubmitting(false);
    if (res.statusCode === 200) onSuccess();
  };
  const [clearFlag, setClearFlag] = useState(false);
  const [isFormReset, setIsFormReset] = useState(false);

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        initialValues={
          existForm
            ? {
                name: existForm.name,
                address: existForm.address,
                email: existForm.email,
                tel: existForm.tel,
                ceo: existForm.ceo,
                canBePartner: existForm.canBePartner ? 'true' : 'false',
                activityField: existForm.activityField
              }
            : {
                activityField: '',
                name: '',
                address: '',
                email: '',
                tel: '',
                ceo: '',
                canBePartner: ''
              }
        }
        validationSchema={createValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {({ setValues, isSubmitting, submitForm, resetForm, errors }) => (
          <Form>
            <Grid display={'flex'} flexDirection={'column'} gap={'30px'}>
              <Grid display={'flex'} flexDirection={'row'} gap={'40px'}>
                <CustomRichTreeView
                  defaultValue={
                    existForm && !isFormReset
                      ? ['activity_field_' + existForm.activityFieldId]
                      : undefined
                  }
                  items={mapAllIdsInNestedArray(
                    'activity_field_',
                    activityFields
                  )}
                  onSelectedItemsChange={(_, itemIds) =>
                    setValues((prevValues) => ({
                      ...prevValues,
                      activityField: itemIds
                    }))
                  }
                  label={i18n.t('activity_field')}
                  error={errors.activityField}
                  clearFlag={clearFlag}
                />
                <Grid
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  gap={'10px'}
                >
                  <TextFieldFormik
                    name="name"
                    label={i18n.t('company_name').toString()}
                  />
                  <TextFieldFormik
                    name="tel"
                    type="tel"
                    label={i18n.t('tel').toString()}
                  />
                  <TextFieldFormik
                    name="ceo"
                    label={i18n.t('ceo').toString()}
                  />
                </Grid>
              </Grid>
              <TextFieldFormik
                name="email"
                label={i18n.t('email_or_social_media_account').toString()}
                sx={{ width: '790px' }}
              />
              <TextFieldFormik
                name="address"
                label={i18n.t('address').toString()}
                sx={{ width: '790px' }}
              />
              <Grid display={'flex'} flexDirection={'row'}>
                <RadioButtonGroupFormik
                  sx={{ width: '790px' }}
                  name="canBePartner"
                  legend={i18n.t('status')}
                  options={[
                    { id: 'true', label: i18n.t('can_be_partner') },
                    { id: 'false', label: i18n.t('can_not_be_partner') }
                  ]}
                />
              </Grid>
              {isSubmitting && <InlineLoader />}
              {!isSubmitting && (
                <OpGrid
                  onCreateOrEdit={submitForm}
                  onClose={onClose}
                  onClear={() => {
                    setClearFlag(true);
                    setTimeout(() => {
                      setClearFlag(false);
                    }, 300);
                    if (existForm) {
                      setValues({
                        activityField: '',
                        name: '',
                        address: '',
                        email: '',
                        tel: '',
                        ceo: '',
                        canBePartner: ''
                      });
                      setIsFormReset(true);
                    } else resetForm();
                  }}
                />
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateOrEditForm;
