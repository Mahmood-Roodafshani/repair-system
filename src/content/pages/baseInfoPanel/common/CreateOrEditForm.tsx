import { Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { InlineLoader, OpGrid, CustomRichTreeView } from 'src/components';
import { i18n } from 'src/i18n';
import { SelectFormik, TextFieldFormik } from 'src/mahmood-components';
import { MilitaryDegreeMock } from 'src/mock';
import {
  DegreeOptions,
  FamilyRelationOptions,
  GenderOptions,
  MaritalStatusOptions,
  ReligionOptions,
  ServiceStatusOptions
} from 'src/models';
import { createStaff, updateStaff } from 'src/service';
import {
  RichViewType,
  StaffInfoRequestType,
  StaffInfoResponseType
} from 'src/types';
import CustomDatePicker from 'src/components/customDatePicker/CustomDatePicker';
import {
  createFamilyMemberValidationSchema,
  createNonStaffValidationSchema,
  createStaffValidationSchema
} from './validationSchema';

function CreateOrEditForm({
  initialValues,
  cities,
  educationalFields,
  workLocations,
  setStaffInfo,
  onClose,
  mode
}: {
  initialValues: StaffInfoRequestType;
  cities: RichViewType[];
  educationalFields: RichViewType[];
  workLocations?: RichViewType[];
  setStaffInfo: Dispatch<SetStateAction<StaffInfoResponseType[]>>;
  onClose: () => void;
  mode: 'staff' | 'nonStaff' | 'family';
}) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  useEffect(() => {
    setIsInEditMode(initialValues.id !== undefined);
  }, [initialValues]);

  const onSubmit = async (
    values: StaffInfoRequestType,
    actions: FormikHelpers<StaffInfoRequestType>
  ) => {
    const res = await (isInEditMode
      ? updateStaff({ staffId: values.id, staffInfo: values })
      : createStaff({ staffInfo: values }));
    actions.setSubmitting(false);
    if (res.statusCode === 200) {
      setStaffInfo(res.content);
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
                  sx={{ width: '250px' }}
                  name="firstname"
                  label={i18n.t('firstname').toString()}
                />
                <TextFieldFormik
                  sx={{ width: '250px' }}
                  name="lastname"
                  label={i18n.t('lastname').toString()}
                />
                <TextFieldFormik
                  sx={{ width: '250px' }}
                  name="fatherName"
                  label={i18n.t('father_name').toString()}
                />
                <TextFieldFormik
                  sx={{ width: '250px' }}
                  name="idNumber"
                  label={i18n.t('id_number').toString()}
                  type="number"
                />
                <TextFieldFormik
                  sx={{ width: '250px' }}
                  name="nationalCode"
                  label={i18n.t('national_code').toString()}
                  type="number"
                />
                {mode === 'staff' && (
                  <TextFieldFormik
                    sx={{ width: '250px' }}
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
                    sx={{ width: '250px' }}
                    name="mobile"
                    label={i18n.t('mobile').toString()}
                    type="number"
                  />
                )}
                {mode === 'family' && (
                  <TextFieldFormik
                    sx={{ width: '250px' }}
                    name="supervisorNationalCode"
                    label={i18n.t('supervisor_national_code').toString()}
                    type="number"
                  />
                )}
                <SelectFormik
                  sx={{ width: '250px' }}
                  options={ReligionOptions}
                  name="religion"
                  label={i18n.t('religion').toString()}
                />
                <SelectFormik
                  sx={{ width: '250px' }}
                  options={DegreeOptions}
                  name="degree"
                  label={i18n.t('degree').toString()}
                />
                {mode === 'staff' && (
                  <SelectFormik
                    sx={{ width: '250px' }}
                    options={ServiceStatusOptions}
                    name="serviceStatus"
                    label={i18n.t('service_status').toString()}
                  />
                )}
                <SelectFormik
                  sx={{ width: '250px' }}
                  options={GenderOptions}
                  name="gender"
                  label={i18n.t('gender').toString()}
                />
                {mode === 'staff' && (
                  <SelectFormik
                    sx={{ width: '250px' }}
                    options={MilitaryDegreeMock}
                    name="militaryDegree"
                    label={i18n.t('military_degree').toString()}
                  />
                )}
                <SelectFormik
                  sx={{ width: '250px' }}
                  options={MaritalStatusOptions}
                  name="martialStatus"
                  label={i18n.t('martial_status').toString()}
                />
                {mode === 'family' && (
                  <SelectFormik
                    sx={{ width: '250px' }}
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
                    items={workLocations.map((e) => ({
                      id: 'work_location_' + e.id,
                      label: e.label,
                      children: e.children
                    }))}
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
                    items={educationalFields.map((e) => ({
                      id: 'educational_fields_' + e.id,
                      label: e.label,
                      children: e.children
                    }))}
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
                    items={cities.map((e) => ({
                      id: 'cities_' + e.id,
                      label: e.label,
                      children: e.children
                    }))}
                    onSelectedItemsChange={(_, itemIds) =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        birthLocation: itemIds[0]
                      }))
                    }
                    selectedItems={[values.birthLocation?.toString()]}
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
