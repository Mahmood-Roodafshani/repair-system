import { Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { Helmet } from 'react-helmet-async';
import { DateObject } from 'react-multi-date-picker';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  CustomDatePicker,
  CustomRichTreeView,
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid
} from 'src/components';
import { i18n } from 'src/i18n';
import {
  ConfirmationDialog,
  SelectFormik,
  TextFieldFormik
} from 'src/mahmood-components';
import {
  EducationalFieldMock,
  MilitaryDegreeMock,
  WorkLocationsMock
} from 'src/mock';
import {
  Degree,
  DegreeOptions,
  Gender,
  MaritalStatus,
  MaritalStatusOptions,
  Religion,
  ServiceStatus,
  ServiceStatusOptions
} from 'src/models';
import { fetchCities, fetchStaffInfoList, removeStaff } from 'src/service';
import {
  RichViewType,
  StaffInfoRequestType,
  StaffInfoResponseType
} from 'src/types';
import { filterValidationSchema } from '../common/validationSchema';
import CreateOrEditForm from '../common/CreateOrEditForm';

function StaffInfo() {
  const [cities, setCities] = useState<RichViewType[]>();
  const [educationalFields, setEducationalFields] =
    useState<RichViewType[]>(EducationalFieldMock);
  const [workLocations, setWorkLocations] =
    useState<RichViewType[]>(WorkLocationsMock);

  const [staffInfo, setStaffInfo] = useState<StaffInfoResponseType[]>();
  const [selectedStaffForEdit, setSelectedStaffForEdit] =
    useState<StaffInfoResponseType>();
  const [selectedStaffIdForDelete, setSelectedStaffIdForDelete] = useState<
    string | number
  >();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((selectedStaffForEdit || showCreateForm) && !cities) {
      setLoading(true);
      Promise.all([fetchCities()])
        .then((res) => {
          if (res[0].statusCode === 200) setCities(res[0].content);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedStaffForEdit, showCreateForm]);

  const onSubmit = async (
    values: StaffInfoRequestType,
    actions: FormikHelpers<StaffInfoRequestType>
  ) => {
    setStaffInfo([]);
    const res = await fetchStaffInfoList({ filter: values });
    actions.setSubmitting(false);
    if (res.statusCode === 200) setStaffInfo(res.content);
  };

  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        header: i18n.t('row_number'),
        enableHiding: false,
        Cell: ({ row }) => {
          return (
            <Typography sx={{ textAlign: 'right' }} key={'row_' + row.index}>
              {row.index + 1}
            </Typography>
          );
        },
        size: 40
      },
      {
        header: i18n.t('name'),
        accessorKey: 'name',
        size: 150
      },
      {
        header: i18n.t('father_name'),
        accessorKey: 'fatherName',
        size: 100
      },
      {
        header: i18n.t('national_code'),
        accessorKey: 'nationalCode',
        size: 120
      },
      {
        header: i18n.t('id_number'),
        accessorKey: 'idNumber',
        size: 120
      },
      {
        header: i18n.t('staff_code'),
        accessorKey: 'staffCode',
        size: 120
      },
      {
        header: i18n.t('work_location'),
        accessorKey: 'workLocation'
      },
      {
        header: i18n.t('degree'),
        accessorFn: (row) => i18n.t(row.degree.toString().toLowerCase()),
        size: 120
      }
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>{i18n.t('staffInfo').toString()}</title>
      </Helmet>
      {!selectedStaffForEdit && !showCreateForm && (
        <Grid display={'flex'} flexDirection={'column'} gap={'20px'}>
          <Formik
            onSubmit={onSubmit}
            initialValues={{}}
            validationSchema={filterValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
          >
            {({
              values,
              setValues,
              isSubmitting,
              submitForm,
              resetForm,
              errors
            }) => (
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
                      <TextFieldFormik
                        sx={{ width: '250px' }}
                        name="staffCode"
                        label={i18n.t('staff_code').toString()}
                        type="number"
                      />
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
                    </Grid>
                    <Grid
                      display={'flex'}
                      flexDirection={'row'}
                      gap={'20px'}
                      flexWrap="wrap"
                    >
                      <SelectFormik
                        sx={{ width: '250px' }}
                        options={MilitaryDegreeMock}
                        name="militaryDegree"
                        label={i18n.t('military_degree').toString()}
                      />
                      <SelectFormik
                        sx={{ width: '250px' }}
                        options={MaritalStatusOptions}
                        name="martialStatus"
                        label={i18n.t('martial_status').toString()}
                      />
                      <SelectFormik
                        sx={{ width: '250px' }}
                        options={DegreeOptions}
                        name="degree"
                        label={i18n.t('degree').toString()}
                      />
                      <SelectFormik
                        sx={{ width: '250px' }}
                        options={ServiceStatusOptions}
                        name="serviceStatus"
                        label={i18n.t('service_status').toString()}
                      />
                    </Grid>
                  </Grid>
                  {isSubmitting && <InlineLoader />}
                  {!isSubmitting && (
                    <OpGrid
                      onClose={() => navigate('/base-info-panel')}
                      onCreateOrEdit={() => setShowCreateForm(true)}
                      createOrEditLabel={i18n.t('new_staff')}
                      onSearch={submitForm}
                      onClear={resetForm}
                    />
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
          {staffInfo && (
            <MyCustomTable
              enableRowActions={true}
              rowActions={({
                row
              }: {
                row: { original: { id: string | number } };
              }) => (
                <Grid display={'flex'} flex={'row'} gap={'10px'}>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      console.log(
                        staffInfo.find((e) => e.id === row.original.id).hireDate
                      );

                      console.log(
                        new DateObject({
                          date: staffInfo.find((e) => e.id === row.original.id)
                            .hireDate,
                          calendar: persian,
                          locale: gregorian_en
                        })
                          .convert(gregorian, gregorian_en)
                          .format('YYYY-MM-DD')
                      );
                      setSelectedStaffForEdit(
                        staffInfo.find((e) => e.id === row.original.id)
                      );
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setSelectedStaffIdForDelete(row.original.id)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              )}
              data={staffInfo}
              columns={columns}
            />
          )}
          <ConfirmationDialog
            id="remove_modal"
            open={selectedStaffIdForDelete !== undefined}
            onClose={() => setSelectedStaffIdForDelete(undefined)}
            closeOnEsc={true}
            dialogTitle={i18n.t('confirm_remove')}
            dialogOkBtnAction={() => {
              setLoading(true);
              removeStaff({ staffId: selectedStaffIdForDelete })
                .then((res) => {
                  if (res.statusCode === 200) {
                    setStaffInfo(
                      staffInfo.filter((e) => e.id !== selectedStaffIdForDelete)
                    );
                    toast.success(i18n.t('user_removed').toString());
                  }
                })
                .finally(() => setLoading(false));
            }}
          />
        </Grid>
      )}
      {(selectedStaffForEdit || showCreateForm) && cities && (
        <CreateOrEditForm
          mode="staff"
          cities={cities}
          initialValues={
            showCreateForm
              ? {}
              : {
                  firstname: selectedStaffForEdit.name.split(' ')[0],
                  lastname: selectedStaffForEdit.name.split(' ')[1],
                  fatherName: selectedStaffForEdit.fatherName,
                  nationalCode: selectedStaffForEdit.nationalCode,
                  staffCode: selectedStaffForEdit.staffCode,
                  idNumber: selectedStaffForEdit.idNumber,
                  address: selectedStaffForEdit.address,
                  mobile: selectedStaffForEdit.mobile,
                  degree: Degree[selectedStaffForEdit.degree],
                  birthLocation: selectedStaffForEdit.birthLocation,
                  serviceStatus:
                    ServiceStatus[selectedStaffForEdit.serviceStatus],
                  gender: Gender[selectedStaffForEdit.gender as string],
                  militaryDegree: selectedStaffForEdit.militaryDegree,
                  martialStatus:
                    MaritalStatus[selectedStaffForEdit.maritalStatus],
                  religion: Religion[selectedStaffForEdit.religion],
                  hireDate: selectedStaffForEdit.hireDate
                }
          }
          workLocations={workLocations}
          educationalFields={educationalFields}
          setStaffInfo={setStaffInfo}
          onClose={() => {
            setShowCreateForm(false);
            setSelectedStaffForEdit(undefined);
          }}
        />
      )}
      {loading && <Loader />}
    </>
  );
}

export default StaffInfo;
