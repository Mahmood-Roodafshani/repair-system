import { CustomRichTreeView, InlineLoader, OpGrid } from '@/components';
import { SelectFormik, TextFieldFormik } from '@/components/form';
import { ActivityOptions } from '@/constant';
import { roleManagementService } from '@/services';
import { PermissionDto, RoleDto } from '@/types';
import { mapAllIdsInNestedArray } from '@/utils/helper';
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
  initialValues: RoleDto;
  permissions: PermissionDto[];
  onSuccess: (newItem: RoleDto) => void;
  onClose: () => void;
}

function CreateOrEditForm({
  initialValues,
  permissions,
  onSuccess,
  onClose
}: CreateOrEditFormProps) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [permissionDefaultValues, setPermissionDefaultValues] = useState<
    string[]
  >([]);
  const { t } = useTranslation();

  useEffect(() => {
    setIsInEditMode('id' in initialValues && initialValues.id !== undefined);
    if ('id' in initialValues && initialValues.id !== undefined) {
      setPermissionDefaultValues(
        initialValues.permissions?.map((e) => 'permission_' + e.code) || []
      );
    }
  }, [initialValues]);

  const onSubmit = async (values: RoleDto, actions: FormikHelpers<RoleDto>) => {
    try {
      if (isInEditMode && !values.id) {
        actions.setSubmitting(false);
        throw new Error('Permission ID is required for update');
      }
      const res = await (isInEditMode
        ? roleManagementService.update({
            id: values.id || -1,
            data: {
              name: values.name,
              status: values.status,
              permissionCodes: values.permissionCodes,
              description:
                values.description && values.description !== ''
                  ? values.description
                  : undefined
            }
          })
        : roleManagementService.create({
            identifier: values.identifier,
            name: values.name,
            status: values.status,
            permissionCodes: values.permissionCodes,
            description:
              values.description && values.description !== ''
                ? values.description
                : undefined
          }));

      actions.setSubmitting(false);

      toast(
        isInEditMode
          ? t('role_updated').toString()
          : t('role_created').toString(),
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
      {({ isSubmitting, submitForm, errors, setValues }) => (
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
                label={t('role_identifier')}
              />
              <TextFieldFormik name="name" label={t('role_name')} />
              <SelectFormik
                label={t('status')}
                options={ActivityOptions}
                name="status"
              />
              <TextFieldFormik
                name="description"
                multiline={true}
                maxRows={5}
                minRows={3}
                label={t('description')}
              />
              <CustomRichTreeView
                sx={{
                  width: '330px'
                }}
                multiSelect={true}
                checkboxSelection={true}
                label={t('permissions_list')}
                items={mapAllIdsInNestedArray(
                  'permission_',
                  permissions.map((permission) => ({
                    id: permission.code?.toString() || '',
                    label: permission.name
                  }))
                )}
                defaultValue={permissionDefaultValues}
                onSelectedItemsChange={(_, itemIds) => {
                  if (typeof itemIds === 'string') return;
                  setValues((prevValues) => ({
                    ...prevValues,
                    permissionCodes: itemIds.map((itemId) => {
                      return parseInt(itemId.replace('permission_', ''));
                    })
                  }));
                }}
                error={errors.permissionCodes}
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
