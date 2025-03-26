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
  FamilyRelation,
  Gender,
  MaritalStatus,
  Religion
} from 'src/constants';
import { i18n } from 'src/i18n';
import { ConfirmationDialog, TextFieldFormik } from 'src/mahmood-components';
import {
  fetchCities,
  fetchEducationalFields,
  fetchFamilyInfoList,
  removeFamilyInfo
} from 'src/service';
import {
  RichViewType,
  StaffInfoRequestType,
  StaffInfoResponseType
} from 'src/types';
import CreateOrEditForm from '../common/CreateOrEditForm';
import { filterValidationSchema } from '../common/validationSchema';

function FamilyInfo() {
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
      },
      {
        header: i18n.t('supervisor'),
        accessorKey: 'supervisorNationalCode',
        size: 120
      },
      {
        header: i18n.t('relation'),
        accessorFn: (row) =>
          row.familyRelation
            ? i18n.t(
                'family_relation_' +
                  row.familyRelation?.toString().toLowerCase()
              )
            : '',
        size: 120
      }
    ],
    []
  );
  const [filter, setFilter] = useState<StaffInfoRequestType>();
  const [familyInfo, setFamilyInfo] = useState<StaffInfoResponseType[]>();
  const [selectedMemberForEdit, setSelectedMemberForEdit] =
    useState<StaffInfoResponseType>();
  const [selectedMemberIdForDelete, setSelectedMemberIdForDelete] = useState<
    string | number
  >();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<RichViewType[]>();
  const [educationalFields, setEducationalFields] = useState<RichViewType[]>();

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchEducationalFields()])
      .then((res) => {
        if (res[0].statusCode === 200) setEducationalFields(res[0].content);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if ((selectedMemberForEdit || showCreateForm) && !cities) {
      setLoading(true);
      Promise.all([fetchCities()])
        .then((res) => {
          if (res[0].statusCode === 200) setCities(res[0].content);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedMemberForEdit, showCreateForm]);

  const onSubmit = async (
    values: StaffInfoRequestType,
    actions: FormikHelpers<StaffInfoRequestType>
  ) => {
    setFilter(values);
    setFamilyInfo([]);
    const res = await fetchFamilyInfoList({ filter: values });
    actions.setSubmitting(false);
    if (res.statusCode === 200) setFamilyInfo(res.content);
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('family_info').toString()}</title>
      </Helmet>
      {!selectedMemberForEdit && !showCreateForm && (
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
                        name="supervisorNationalCode"
                        label={i18n.t('supervisor_national_code').toString()}
                        type="number"
                      />
                    </Grid>
                  </Grid>
                  {isSubmitting && <InlineLoader />}
                  {!isSubmitting && (
                    <OpGrid
                      onClose={() => navigate('/base-info-panel')}
                      onCreateOrEdit={() => setShowCreateForm(true)}
                      createOrEditLabel={i18n.t('new_family_member')}
                      onSearch={submitForm}
                      onClear={resetForm}
                    />
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
          {familyInfo && (
            <MyCustomTable
              enableRowActions={true}
              rowActions={({
                row
              }: {
                row: { original: { id: string | number } };
              }) => (
                <TableRowAction
                  onEdit={() =>
                    setSelectedMemberForEdit(
                      familyInfo.find((e) => e.id === row.original.id)
                    )
                  }
                  onDelete={() => setSelectedMemberIdForDelete(row.original.id)}
                />
              )}
              data={familyInfo}
              columns={columns}
            />
          )}
          <ConfirmationDialog
            id="remove_modal"
            open={selectedMemberIdForDelete !== undefined}
            onClose={() => setSelectedMemberIdForDelete(undefined)}
            closeOnEsc={true}
            dialogTitle={i18n.t('confirm_remove')}
            dialogOkBtnAction={() => {
              setLoading(true);
              removeFamilyInfo({ memberId: selectedMemberIdForDelete })
                .then((res) => {
                  if (res.statusCode === 200) {
                    setFamilyInfo(
                      familyInfo.filter(
                        (e) => e.id !== selectedMemberIdForDelete
                      )
                    );
                    toast.success(i18n.t('user_removed').toString());
                  }
                })
                .finally(() => setLoading(false));
            }}
          />
        </Grid>
      )}
      {(selectedMemberForEdit || showCreateForm) && cities && (
        <CreateOrEditForm
          cities={cities}
          educationalFields={educationalFields}
          mode={'family'}
          initialValues={
            showCreateForm
              ? {}
              : {
                  firstname: selectedMemberForEdit.name.split(' ')[0],
                  lastname: selectedMemberForEdit.name.split(' ')[1],
                  fatherName: selectedMemberForEdit.fatherName,
                  nationalCode: selectedMemberForEdit.nationalCode,
                  idNumber: selectedMemberForEdit.idNumber,
                  degree: Degree[selectedMemberForEdit.degree],
                  birthLocation: selectedMemberForEdit.birthLocation,
                  gender: Gender[selectedMemberForEdit.gender as string],
                  martialStatus:
                    MaritalStatus[selectedMemberForEdit.maritalStatus],
                  religion: Religion[selectedMemberForEdit.religion],
                  educationalField: selectedMemberForEdit.educationalField,
                  familyRelation:
                    FamilyRelation[selectedMemberForEdit.familyRelation],
                  supervisorNationalCode:
                    selectedMemberForEdit.supervisorNationalCode
                }
          }
          onSuccess={async () => {
            setLoading(true);
            setFamilyInfo([]);
            const res = await fetchFamilyInfoList({ filter: filter });
            if (res.statusCode === 200) setFamilyInfo(res.content);
          }}
          onClose={() => {
            setShowCreateForm(false);
            setSelectedMemberForEdit(undefined);
          }}
        />
      )}
      {loading && <Loader />}
    </>
  );
}

export default FamilyInfo;
