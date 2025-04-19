import { Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid,
  TableRowAction
} from 'src/components';
import {
  Degree,
  Gender,
  JobLevel,
  JobStatus,
  MaritalStatus,
  MilitaryServiceStatus,
  Religion,
  ServiceStatus
} from 'src/constant/enums';
import { i18n } from 'src/localization';
import { ConfirmationDialog, TextFieldFormik } from 'src/components/form';
import {
  fetchNonStaffInfoList,
  removeNonStaff
} from 'src/services';
import CommonService from 'src/services/CommonService';
import {
  RichViewType,
  StaffInfoRequestType,
  StaffInfoResponseType
} from 'src/types';
import CreateOrEditForm from '../common/CreateOrEditForm';
import { filterValidationSchema } from '../common/validationSchema';
import { AxiosResponse } from 'axios';

function OtherInfo() {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const columns = useMemo(
    () => [
      {
        header: i18n.t('row_number'),
        enableHiding: false,
        Cell: ({ row }: { row: { index: number } }) => {
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
  const [filter, setFilter] = useState<StaffInfoRequestType>();
  const [otherInfo, setOtherInfo] = useState<StaffInfoResponseType[]>();
  const [selectedStaffForEdit, setSelectedStaffForEdit] =
    useState<StaffInfoResponseType>();
  const [selectedStaffIdForDelete, setSelectedStaffIdForDelete] = useState<
    string | number
  >();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<RichViewType[]>();
  const [educationalFields, setEducationalFields] = useState<RichViewType[]>();

  useEffect(() => {
    setLoading(true);
    Promise.all([CommonService.getEducationalFields()])
      .then((res) => {
        setEducationalFields(res[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if ((selectedStaffForEdit || showCreateForm) && !cities) {
      setLoading(true);
      Promise.all([CommonService.getCities()])
        .then((res) => {
          setCities(res[0]);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedStaffForEdit, showCreateForm]);

  const onSubmit = async (
    values: StaffInfoRequestType,
    actions: FormikHelpers<StaffInfoRequestType>
  ) => {
    setFilter(values);
    setOtherInfo([]);
    try {
      const res = await fetchNonStaffInfoList({ filter: values });
      if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
        const mockRes = res as { statusCode: number; content: StaffInfoResponseType[] };
        if (mockRes.statusCode === 200) {
          setOtherInfo(mockRes.content);
        }
      } else {
        const apiRes = res as AxiosResponse<StaffInfoResponseType[]>;
        setOtherInfo(apiRes.data);
      }
    } catch (error) {
      toast.error(i18n.t('error'));
    } finally {
      actions.setSubmitting(false);
    }
  };

  const dialogOkBtnAction = async () => {
    if (selectedStaffIdForDelete) {
      setLoading(true);
      try {
        const res = await removeNonStaff({ staffId: selectedStaffIdForDelete });
        if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
          const mockRes = res as { statusCode: number };
          if (mockRes.statusCode === 200) {
            setSelectedStaffIdForDelete(undefined);
            setShowDeleteDialog(false);
            await fetchData();
          }
        } else {
          setSelectedStaffIdForDelete(undefined);
          setShowDeleteDialog(false);
          await fetchData();
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchNonStaffInfoList({ filter: {} });
      if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
        const mockRes = res as { statusCode: number; content: StaffInfoResponseType[] };
        if (mockRes.statusCode === 200) {
          setOtherInfo(mockRes.content);
        }
      } else {
        const apiRes = res as AxiosResponse<StaffInfoResponseType[]>;
        setOtherInfo(apiRes.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const getEnumValue = <T extends Record<string, string | number>>(
    enumObj: T,
    key: string | number | boolean | undefined
  ): T[keyof T] | undefined => {
    if (key === undefined || key === false) return undefined;
    if (typeof key === 'boolean') return undefined;
    return enumObj[key as keyof T];
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('other_info').toString()}</title>
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
            {({ isSubmitting, submitForm, resetForm }) => (
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
          {otherInfo && (
            <MyCustomTable
              enableRowActions={true}
              rowActions={({
                row
              }: {
                row: { original: { id: string | number } };
              }) => (
                <TableRowAction
                  onDelete={() => setSelectedStaffIdForDelete(row.original.id)}
                  onEdit={() =>
                    setSelectedStaffForEdit(
                      otherInfo.find((e) => e.id === row.original.id)
                    )
                  }
                />
              )}
              data={otherInfo}
              columns={columns}
            />
          )}
        </Grid>
      )}
      {(selectedStaffForEdit || showCreateForm) && cities && educationalFields && (
        <CreateOrEditForm
          cities={cities}
          educationalFields={educationalFields}
          mode={'nonStaff'}
          initialValues={
            showCreateForm
              ? {}
              : selectedStaffForEdit
                ? {
                    firstname: selectedStaffForEdit.name?.split(' ')[0] || '',
                    lastname: selectedStaffForEdit.name?.split(' ')[1] || '',
                    fatherName: selectedStaffForEdit.fatherName || '',
                    nationalCode: selectedStaffForEdit.nationalCode || '',
                    idNumber: selectedStaffForEdit.idNumber || '',
                    degree: getEnumValue(Degree, selectedStaffForEdit.degree),
                    birthLocation: selectedStaffForEdit.birthLocation || '',
                    gender: getEnumValue(Gender, selectedStaffForEdit.gender),
                    martialStatus: getEnumValue(
                      MaritalStatus,
                      selectedStaffForEdit.maritalStatus
                    ),
                    religion: getEnumValue(
                      Religion,
                      selectedStaffForEdit.religion
                    ),
                    educationalField:
                      selectedStaffForEdit.educationalField || ''
                  }
                : {}
          }
          onSuccess={async () => {
            setLoading(true);
            setOtherInfo([]);
            const res = await fetchNonStaffInfoList({ filter: filter || {} });
            if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
              const mockRes = res as { statusCode: number; content: StaffInfoResponseType[] };
              if (mockRes.statusCode === 200) {
                setOtherInfo(mockRes.content);
              }
            } else {
              const apiRes = res as AxiosResponse<StaffInfoResponseType[]>;
              setOtherInfo(apiRes.data);
            }
            setLoading(false);
          }}
          onClose={() => {
            setShowCreateForm(false);
            setSelectedStaffForEdit(undefined);
          }}
        />
      )}
      {loading && <Loader />}
      <ConfirmationDialog
        id="remove_modal"
        open={selectedStaffIdForDelete !== undefined}
        onClose={() => setSelectedStaffIdForDelete(undefined)}
        closeOnEsc={true}
        dialogTitle={i18n.t('confirm_remove')}
        dialogOkBtnAction={dialogOkBtnAction}
      />
    </>
  );
}

export default OtherInfo;
