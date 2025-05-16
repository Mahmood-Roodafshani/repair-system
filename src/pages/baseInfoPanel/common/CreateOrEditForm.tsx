import { Box, Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { CustomDatePicker, CustomRichTreeView, InlineLoader, Loader, OpGrid } from 'src/components';
import {
  DegreeOptions,
  FamilyRelationOptions,
  GenderOptions,
  MaritalStatusOptions,
  ReligionOptions,
  ServiceStatusOptions
} from 'src/constant/options';
import { i18n } from 'src/localization';
import { SelectFormik, TextFieldFormik } from '@/components/form';
import {
  createFamilyInfo,
  createNonStaff,
  createStaff,
  updateFamilyInfo,
  updateNonStaff,
  updateStaff
} from 'src/services';
import { RichViewType, StaffInfoRequestType } from 'src/types';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import {
  createFamilyMemberValidationSchema,
  createNonStaffValidationSchema,
  createStaffValidationSchema
} from './validationSchema';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

interface CreateOrEditFormProps {
  initialValues: StaffInfoRequestType;
  cities: RichViewType[];
  educationalFields: RichViewType[];
  workLocations?: RichViewType[];
  positionDegrees?: RichViewType[];
  onSuccess: () => void;
  onClose: () => void;
  mode: 'staff' | 'nonStaff' | 'family';
}

function CreateOrEditForm({
                            initialValues,
                            cities,
                            educationalFields,
                            workLocations,
                            positionDegrees,
                            onSuccess,
                            onClose,
                            mode
                          }: CreateOrEditFormProps) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [workLocationDefaultValue, setWorkLocationDefaultValue] =
    useState<string[]>();
  const [educationalFieldDefaultValue, setEducationalFieldDefaultValue] =
    useState<string[]>();
  const [birthLocationDefaultValue, setBirthLocationDefaultValue] =
    useState<string[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsInEditMode(initialValues.id !== undefined);
    if (initialValues.id !== undefined) {
      setWorkLocationDefaultValue([
        'work_location_' + initialValues.workLocation
      ]);
      setEducationalFieldDefaultValue([
        'educational_field_' + initialValues.educationalField
      ]);
      setBirthLocationDefaultValue([
        'birth_location_' + initialValues.birthLocation
      ]);
    } else {
      setWorkLocationDefaultValue([]);
      setEducationalFieldDefaultValue([]);
      setBirthLocationDefaultValue([]);
    }
  }, [initialValues]);

  const onSubmit = async (
    values: StaffInfoRequestType,
    actions: FormikHelpers<StaffInfoRequestType>
  ) => {
    setLoading(true);
    try {
      const res = await (isInEditMode
        ? mode === 'staff'
          ? updateStaff({ staffId: values.id ?? 0, staffInfo: values })
          : mode === 'nonStaff'
            ? updateNonStaff({ staffId: values.id ?? 0, staffInfo: values })
            : updateFamilyInfo({ memberId: values.id ?? 0, memberInfo: values })
        : mode === 'staff'
          ? createStaff({ staffInfo: values })
          : mode === 'nonStaff'
            ? createNonStaff({ staffInfo: values })
            : createFamilyInfo({ memberInfo: values }));
      actions.setSubmitting(false);
      
      const isSuccess = 'statusCode' in res 
        ? res.statusCode === 200 
        : res.status === 200;
        
      if (isSuccess) {
        toast(
          isInEditMode
            ? i18n.t('update_successful')
            : i18n.t('create_successful')
        );
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      actions.setSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('create_or_edit_staff').toString()}</title>
      </Helmet>
      <Box>
        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid item xs>
            <Typography variant="h3">
              {initialValues.id ? i18n.t('edit_staff') : i18n.t('create_staff')}
            </Typography>
          </Grid>
        </Grid>

        {loading ? (
          <Loader />
        ) : (
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={
              mode === 'staff'
                ? createStaffValidationSchema
                : mode === 'nonStaff'
                  ? createNonStaffValidationSchema
                  : createFamilyMemberValidationSchema
            }
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
                        name="firstname"
                        label={i18n.t('firstname').toString()}
                      />
                      <TextFieldFormik
                        name="lastname"
                        label={i18n.t('lastname').toString()}
                      />
                      <TextFieldFormik
                        name="fatherName"
                        label={i18n.t('father_name').toString()}
                      />
                      <TextFieldFormik
                        name="idNumber"
                        label={i18n.t('id_number').toString()}
                        type="number"
                      />
                      <TextFieldFormik
                        name="nationalCode"
                        label={i18n.t('national_code').toString()}
                        type="number"
                      />
                      {mode === 'staff' && (
                        <TextFieldFormik
                          name="staffCode"
                          label={i18n.t('staff_code').toString()}
                          type="number"
                        />
                      )}
                      {mode === 'staff' && (
                        <CustomDatePicker
                          label={i18n.t('hire_date')}
                          value={values.hireDate}
                          onChange={(e) => {
                            setValues((prevValues) => ({
                              ...prevValues,
                              hireDate: e
                            }));
                          }}
                          error={errors.hireDate}
                        />
                      )}
                      {(mode === 'staff' || mode === 'nonStaff') && (
                        <TextFieldFormik
                          name="mobile"
                          label={i18n.t('mobile').toString()}
                          type="number"
                        />
                      )}
                      {mode === 'family' && (
                        <TextFieldFormik
                          name="supervisorNationalCode"
                          label={i18n.t('supervisor_national_code').toString()}
                          type="number"
                        />
                      )}
                      <SelectFormik
                        options={ReligionOptions}
                        name="religion"
                        label={i18n.t('religion').toString()}
                      />
                      <SelectFormik
                        options={DegreeOptions}
                        name="degree"
                        label={i18n.t('degree').toString()}
                      />
                      {mode === 'staff' && (
                        <SelectFormik
                          options={ServiceStatusOptions}
                          name="serviceStatus"
                          label={i18n.t('service_status').toString()}
                        />
                      )}
                      <SelectFormik
                        options={GenderOptions}
                        name="gender"
                        label={i18n.t('gender').toString()}
                      />
                      {mode === 'staff' && positionDegrees!= undefined && (
                        <SelectFormik
                          options={positionDegrees}
                          name="positionDegree"
                          label={i18n.t('position_degree').toString()}
                        />
                      )}
                      <SelectFormik
                        options={MaritalStatusOptions}
                        name="martialStatus"
                        label={i18n.t('martial_status').toString()}
                      />
                      {mode === 'family' && (
                        <SelectFormik
                          options={FamilyRelationOptions}
                          name="familyRelation"
                          label={i18n.t('family_relation').toString()}
                        />
                      )}
                    </Grid>

                    <Grid display={'flex'} flexDirection={'row'} gap={'20px'}>
                      {workLocations && (
                        <CustomRichTreeView
                          sx={{
                            width: '330px'
                          }}
                          label={i18n.t('work_location')}
                          items={mapAllIdsInNestedArray(
                            'work_location_',
                            workLocations
                          )}
                          defaultValue={workLocationDefaultValue}
                          onSelectedItemsChange={(_, itemIds) =>
                            setValues((prevValues) => ({
                              ...prevValues,
                              workLocation: itemIds[0]
                            }))
                          }
                          error={errors.workLocation}
                        />
                      )}
                      {educationalFields && (
                        <CustomRichTreeView
                          label={i18n.t('educational_field')}
                          sx={{
                            width: '330px'
                          }}
                          defaultValue={educationalFieldDefaultValue}
                          items={mapAllIdsInNestedArray(
                            'educational_fields_',
                            educationalFields
                          )}
                          onSelectedItemsChange={(_, itemIds) =>
                            setValues((prevValues) => ({
                              ...prevValues,
                              educationalField: itemIds[0]
                            }))
                          }
                          error={errors.educationalField}
                        />
                      )}
                      {cities && (
                        <CustomRichTreeView
                          sx={{
                            width: '330px'
                          }}
                          label={i18n.t('birth_location').toString()}
                          defaultValue={birthLocationDefaultValue}
                          items={mapAllIdsInNestedArray('cities_', cities)}
                          onSelectedItemsChange={(_, itemIds) =>
                            setValues((prevValues) => ({
                              ...prevValues,
                              birthLocation: itemIds[0]
                            }))
                          }
                          error={errors.birthLocation}
                        />
                      )}
                    </Grid>
                    {(mode === 'staff' || mode === 'nonStaff') && (
                      <Grid
                        display={'flex'}
                        flexDirection={'row'}
                        gap={'20px'}
                        alignItems={'end'}
                        alignContent={'end'}
                        justifyItems={'end'}
                      >
                        <TextFieldFormik
                          sx={{ width: '400px' }}
                          name="address"
                          label={i18n.t('address').toString()}
                          type="text"
                          multiline={true}
                          minRows={2}
                          maxRows={3}
                        />
                      </Grid>
                    )}
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
        )}
      </Box>
    </>
  );
}

export default CreateOrEditForm;
