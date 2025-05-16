import { CustomRichTreeView, InlineLoader, OpGrid } from '@/components';
import { SelectFormik, TextFieldFormik } from '@/components/form';
import { ActivityOptions } from '@/constant';
import { groupAccessService } from '@/services';
import { GroupAccessDto, RoleDto } from '@/types';
import { mapAllIdsInNestedArray } from '@/utils/helper';
import { Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface CreateOrEditFormProps {
  initialValues: GroupAccessDto;
  roles: RoleDto[];
  onSuccess: (newItem: GroupAccessDto) => void;
  onClose: () => void;
}

function CreateOrEditForm({
  initialValues,
  roles,
  onSuccess,
  onClose
}: CreateOrEditFormProps) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [roleDefaultValues, setRoleDefaultValues] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setIsInEditMode('id' in initialValues && initialValues.id !== undefined);
    if ('id' in initialValues && initialValues.id !== undefined) {
      setRoleDefaultValues(
        initialValues.roles?.map((e) => 'group_access_' + e.id) || []
      );
    }
  }, [initialValues]);

  const onSubmit = async (
    values: GroupAccessDto,
    actions: FormikHelpers<GroupAccessDto>
  ) => {
    try {
      if (isInEditMode && !values.id) {
        actions.setSubmitting(false);
        throw new Error('Roles ID is required for update');
      }
      const res = await (isInEditMode
        ? groupAccessService.update({
            id: values.id || -1,
            data: {
              name: values.name,
              status: values.status,
              roleIds: values.roleIds,
              description:
                values.description && values.description !== ''
                  ? values.description
                  : undefined
            }
          })
        : groupAccessService.create({
            identifier: values.identifier,
            name: values.name,
            status: values.status,
            roleIds: values.roleIds,
            description:
              values.description && values.description !== ''
                ? values.description
                : undefined
          }));

      actions.setSubmitting(false);

      toast(
        isInEditMode
          ? t('group_access_updated').toString()
          : t('group_access_created').toString(),
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
      //   validationSchema={
      //     isInEditMode ? updateValidationSchema : createValidationSchema
      //   }
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
                label={t('group_access_identifier')}
              />
              <TextFieldFormik name="name" label={t('group_access_name')} />
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
                label={t('roles_list')}
                items={mapAllIdsInNestedArray(
                  'group_access_',
                  roles.map((role) => ({
                    id: role.id?.toString() || '',
                    label: role.name
                  }))
                )}
                defaultValue={roleDefaultValues}
                onSelectedItemsChange={(_, itemIds) => {
                  if (typeof itemIds === 'string') return;
                  setValues((prevValues) => ({
                    ...prevValues,
                    roleIds: itemIds.map((itemId) => {
                      return parseInt(itemId.replace('group_access_', ''));
                    })
                  }));
                }}
                error={errors.roleIds}
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
