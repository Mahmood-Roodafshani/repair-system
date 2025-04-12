import { Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import {
  CustomDatePicker,
  CustomRichTreeView,
  InlineLoader,
  OpGrid
} from 'src/components';
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

function CreateOrEditForm({
  initialValues,
  cities,
  educationalFields,
  workLocations,
  positionDegrees,
  onSuccess,
  onClose,
  mode
}: {
  initialValues: StaffInfoRequestType;
  cities: RichViewType[];
  educationalFields: RichViewType[];
  workLocations?: RichViewType[];
  positionDegrees?: RichViewType[];
  onSuccess: () => void;
  onClose: () => void;
  mode: 'staff' | 'nonStaff' | 'family';
}) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [workLocationDefaultValue, setWorkLocationDefaultValue] =
    useState<string[]>();
  const [educationalFieldDefaultValue, setEducationalFieldDefaultValue] =
    useState<string[]>();
  const [birthLocationDefaultValue, setBirthLocationDefaultValue] =
    useState<string[]>();

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
    const res = await (isInEditMode
      ? mode === 'staff'
        ? updateStaff({ staffId: values.id, staffInfo: values })
        : mode === 'nonStaff'
        ? updateNonStaff({ staffId: values.id, staffInfo: values })
        : updateFamilyInfo({ memberId: values.id, memberInfo: values })
      : mode === 'staff'
      ? createStaff({ staffInfo: values })
      : mode === 'nonStaff'
      ? createNonStaff({ staffInfo: values })
      : createFamilyInfo({ memberInfo: values }));
    actions.setSubmitting(false);
    if (res.statusCode === 200) {
      toast(
        isInEditMode
          ? mode === 'staff'
            ? i18n.t('staff_updated').toString()
            : mode === 'nonStaff'
            ? i18n.t('non_staff_updated').toString()
            : i18n.t('family_member_updated').toString()
          : mode === 'staff'
          ? i18n.t('staff_created').toString()
          : mode === 'nonStaff'
          ? i18n.t('non_staff_created').toString()
          : i18n.t('family_member_created').toString(),
        { type: 'success' }
      );
      onSuccess();
    }
    onClose();
  };

  return (
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
                {mode === 'staff' && (
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
  );
}

export default CreateOrEditForm;
