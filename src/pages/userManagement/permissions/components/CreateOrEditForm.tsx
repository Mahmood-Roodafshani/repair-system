import { InlineLoader, OpGrid } from '@/components';
import { SelectFormik, TextFieldFormik } from '@/components/form';
import { ActivityOptions, OptionType } from '@/constant';
import { permissionService } from '@/services';
import { PermissionDto } from '@/types';
import { Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  createValidationSchema,
  updateValidationSchema
} from './validationSchema';

interface CreateOrEditFormProps {
  initialValues: PermissionDto;
  operationTypes: OptionType[];
  onSuccess: (newItem: PermissionDto) => void;
  onClose: () => void;
}

function CreateOrEditForm({
  initialValues,
  operationTypes,
  onSuccess,
  onClose
}: CreateOrEditFormProps) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setIsInEditMode(
      'code' in initialValues && initialValues.code !== undefined
    );
  }, [initialValues]);

  const onSubmit = async (
    values: PermissionDto,
    actions: FormikHelpers<PermissionDto>
  ) => {
    try {
      if (isInEditMode && !values.code) {
        actions.setSubmitting(false);
        throw new Error('Permission ID is required for update');
      }
      const res = await (isInEditMode
        ? permissionService.update({
            code: values.code || -1,
            data: {
              name: values.name,
              operationType: values.operationType,
              state: values.state,
              url: values.url && values.url !== '' ? values.url : undefined,
              description:
                values.description && values.description !== ''
                  ? values.description
                  : undefined
            }
          })
        : permissionService.create({
            identifier: values.identifier,
            name: values.name,
            state: values.state,
            operationType: values.operationType,
            url: values.url && values.url !== '' ? values.url : undefined,
            description:
              values.description && values.description !== ''
                ? values.description
                : undefined
          }));

      actions.setSubmitting(false);

      toast(
        isInEditMode
          ? t('permission_updated').toString()
          : t('permission_created').toString(),
        {
          type: 'success'
        }
      );
      onSuccess(res);
      onClose();
    } catch (error) {
      actions.setSubmitting(false);
      toast(t('error_occurred').toString(), {
        type: 'error'
      });
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={
        isInEditMode ? updateValidationSchema : createValidationSchema
      }
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ isSubmitting, submitForm }) => (
        <Form>
          <Grid display={'flex'} flexDirection={'column'} gap={'30px'}>
            <Grid
              display={'flex'}
              flexDirection={'row'}
              gap={'20px'}
              flexWrap="wrap"
            >
              <TextFieldFormik
                disabled={isInEditMode}
                name="identifier"
                label={t('permission_identifier')}
              />
              <TextFieldFormik name="name" label={t('permission_name')} />
              <SelectFormik
                label={t('status')}
                options={ActivityOptions}
                name="state"
              />
              <SelectFormik
                label={t('operation_type')}
                options={operationTypes}
                name="operationType"
              />
              <TextFieldFormik name="url" label={t('url')} />
              <TextFieldFormik
                name="description"
                multiline={true}
                maxRows={5}
                minRows={3}
                label={t('description')}
              />
            </Grid>
            {isSubmitting && <InlineLoader />}
            {!isSubmitting && (
              <OpGrid onClose={onClose} onCreateOrEdit={submitForm} />
            )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default CreateOrEditForm;
