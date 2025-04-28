import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { createJob, updateJob } from 'src/services';
import { JobRequestType, RichViewType } from 'src/types';
import validationSchema from './validationSchema';
import { i18n } from 'src/localization';
import { SelectFormik, TextFieldFormik } from '@/components/form';
import { Grid } from '@mui/material';
import { CustomRichTreeView, InlineLoader, OpGrid } from 'src/components';
import { JobLevelOptions, JobStatusOptions } from 'src/constant/options';
import { CKEditorToolbar, mapAllIdsInNestedArray } from 'src/utils/helper';
import { toast } from 'react-toastify';

interface CreateOrEditFormProps {
  initialValues: JobRequestType;
  positionDegrees: RichViewType[];
  fields: RichViewType[];
  courses: RichViewType[];
  organizationUnits: RichViewType[];
  onSuccess: () => void;
  onClose: () => void;
}

function CreateOrEditForm({
  initialValues,
  positionDegrees,
  fields,
  courses,
  organizationUnits,
  onSuccess,
  onClose
}: CreateOrEditFormProps) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [neededCoursesDefaultValues, setNeededCoursesDefaultValues] = useState<string[]>([]);
  const [neededFieldsDefaultValues, setNeededFieldsDefaultValues] = useState<string[]>([]);
  const [organizationUnitsDefaultValues, setOrganizationUnitsDefaultValues] = useState<string[]>([]);

  useEffect(() => {
    setIsInEditMode('id' in initialValues && initialValues.id !== undefined);
    if ('id' in initialValues && initialValues.id !== undefined) {
      setNeededCoursesDefaultValues(
        initialValues.neededCourses?.map((e) => 'job_course_' + e) || []
      );
      setNeededFieldsDefaultValues(
        initialValues.neededFields?.map((e) => 'job_field_' + e) || []
      );
      setOrganizationUnitsDefaultValues(
        initialValues.organizationUnit ? ['organization_unit_' + initialValues.organizationUnit] : []
      );
    } else {
      setNeededCoursesDefaultValues([]);
      setNeededFieldsDefaultValues([]);
      setOrganizationUnitsDefaultValues([]);
    }
  }, [initialValues]);

  const onSubmit = async (
    values: JobRequestType,
    actions: FormikHelpers<JobRequestType>
  ) => {
    try {
      if (isInEditMode && !values.id) {
        throw new Error('Job ID is required for update');
      }
      const res = await (isInEditMode
        ? updateJob({ id: values.id, data: values })
        : createJob({ data: values }));
      
      actions.setSubmitting(false);
      
      if (res?.statusCode === 200) {
        toast(
          isInEditMode
            ? i18n.t('job_updated').toString()
            : i18n.t('job_created').toString(),
          {
            type: 'success'
          }
        );
        onSuccess();
      }
    } catch (error) {
      actions.setSubmitting(false);
      toast(i18n.t('error_occurred').toString(), {
        type: 'error'
      });
    } finally {
      onClose();
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ values, setValues, isSubmitting, submitForm, resetForm, errors }) => (
        <Form>
          <Grid display={'flex'} flexDirection={'column'} gap={'30px'}>
            <Grid display={'flex'} flexDirection={'column'} gap={'10px'}>
              <Grid
                display={'flex'}
                flexDirection={'row'}
                gap={'20px'}
                flexWrap="wrap"
              >
                <TextFieldFormik
                  sx={{ width: '330px' }}
                  name="title"
                  label={i18n.t('job_title').toString()}
                />
                <TextFieldFormik
                  sx={{ width: '330px' }}
                  name="code"
                  label={i18n.t('job_code').toString()}
                />
                <TextFieldFormik
                  sx={{ width: '330px' }}
                  name="jobDescription"
                  label={i18n.t('job_description').toString()}
                />
                <SelectFormik
                  sx={{ width: '330px' }}
                  options={positionDegrees}
                  name="positionDegree"
                  label={i18n.t('position_degree').toString()}
                />
                <SelectFormik
                  sx={{ width: '330px' }}
                  options={JobLevelOptions}
                  name="jobLevel"
                  label={i18n.t('job_level').toString()}
                />
                <SelectFormik
                  sx={{ width: '330px' }}
                  options={JobStatusOptions}
                  name="jobStatus"
                  label={i18n.t('job_status').toString()}
                />
              </Grid>
              <Grid display={'flex'} flexDirection={'row'} gap={'20px'}>
                {organizationUnits && organizationUnitsDefaultValues && (
                  <CustomRichTreeView
                    sx={{
                      width: '330px'
                    }}
                    checkboxSelection={true}
                    label={i18n.t('organization_unit')}
                    items={mapAllIdsInNestedArray(
                      'organization_unit_',
                      organizationUnits
                    )}
                    defaultValue={organizationUnitsDefaultValues}
                    onSelectedItemsChange={(_, itemIds) => {
                      const selectedId = itemIds?.[0];
                      setValues((prevValues) => ({
                        ...prevValues,
                        organizationUnit: selectedId ? selectedId.replace('organization_unit_', '') : undefined
                      }));
                    }}
                    error={errors.organizationUnit}
                  />
                )}
                {fields && neededFieldsDefaultValues && (
                  <CustomRichTreeView
                    sx={{
                      width: '330px'
                    }}
                    checkboxSelection={true}
                    multiSelect={true}
                    label={i18n.t('job_fields')}
                    items={mapAllIdsInNestedArray('job_field_', fields)}
                    defaultValue={neededFieldsDefaultValues}
                    onSelectedItemsChange={(_, itemIds) => {
                      const selectedIds = itemIds as string[];
                      setValues((prevValues) => ({
                        ...prevValues,
                        neededFields: selectedIds?.map(id => id.replace('job_field_', '')) || []
                      }));
                    }}
                    error={errors.neededFields}
                  />
                )}
                {courses && neededCoursesDefaultValues && (
                  <CustomRichTreeView
                    sx={{
                      width: '330px'
                    }}
                    checkboxSelection={true}
                    multiSelect={true}
                    label={i18n.t('job_courses')}
                    items={mapAllIdsInNestedArray('job_course_', courses)}
                    defaultValue={neededCoursesDefaultValues}
                    onSelectedItemsChange={(_, itemIds) => {
                      const selectedIds = itemIds as string[];
                      setValues((prevValues) => ({
                        ...prevValues,
                        neededCourses: selectedIds?.map(id => id.replace('job_course_', '')) || []
                      }));
                    }}
                    error={errors.neededCourses}
                  />
                )}
              </Grid>
              <Grid sx={{ width: '1030px' }}>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    placeholder: i18n
                      .t('responsibility_description')
                      .toString(),
                    ...CKEditorToolbar
                  }}
                  data={values.responsibilityDescription}
                  onChange={(_, editor) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      responsibilityDescription: editor.getData()
                    }));
                  }}
                />
              </Grid>
            </Grid>
            {isSubmitting && <InlineLoader />}
            {!isSubmitting && (
              <OpGrid
                onClose={onClose}
                onCreateOrEdit={submitForm}
                onClear={resetForm}
              />
            )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default CreateOrEditForm;
