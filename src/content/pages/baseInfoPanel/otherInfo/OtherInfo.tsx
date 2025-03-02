import { Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { InlineLoader, Loader, MyCustomTable, OpGrid } from 'src/components';
import { i18n } from 'src/i18n';
import { ConfirmationDialog, TextFieldFormik } from 'src/mahmood-components';
import {
  RichViewType,
  StaffInfoRequestType,
  StaffInfoResponseType
} from 'src/types';
import CreateOrEditForm from '../common/CreateOrEditForm';
import {
  Degree,
  Gender,
  MaritalStatus,
  Religion,
  ServiceStatus
} from 'src/models';
import { toast } from 'react-toastify';
import { filterValidationSchema } from '../common/validationSchema';
import {
  fetchCities,
  fetchNonStaffInfoList,
  removeNonStaff
} from 'src/service';
import { EducationalFieldMock } from 'src/mock';

function OtherInfo() {
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
        header: i18n.t('staff_code'),
        accessorKey: 'staffCode',
        size: 120
      },
      {
        header: i18n.t('id_number'),
        accessorKey: 'idNumber',
        size: 120
      }
    ],
    []
  );
  const [staffInfo, setStaffInfo] = useState<StaffInfoResponseType[]>();
  const [selectedStaffForEdit, setSelectedStaffForEdit] =
    useState<StaffInfoResponseType>();
  const [selectedStaffIdForDelete, setSelectedStaffIdForDelete] = useState<
    string | number
  >();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<RichViewType[]>();
  const [educationalFields, setEducationalFields] =
    useState<RichViewType[]>(EducationalFieldMock);

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
    const res = await fetchNonStaffInfoList({ filter: values });
    actions.setSubmitting(false);
    if (res.statusCode === 200) setStaffInfo(res.content);
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('otherInfo').toString()}</title>
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
                    </Grid>
                  </Grid>
                  {isSubmitting && <InlineLoader />}
                  {!isSubmitting && (
                    <OpGrid
                      onClose={() => navigate('/base-info-panel')}
                      onCreateOrEdit={() => setShowCreateForm(true)}
                      createOrEditLabel={i18n.t('new_person')}
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
              removeNonStaff({ staffId: selectedStaffIdForDelete })
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
          cities={cities}
          educationalFields={educationalFields}
          mode={'nonStaff'}
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

export default OtherInfo;
