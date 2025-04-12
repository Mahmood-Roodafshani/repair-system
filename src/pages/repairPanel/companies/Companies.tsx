import { Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import {
  CustomRichTreeView,
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid,
  TableRowAction
} from 'src/components';
import { i18n } from 'src/localization';
import {
  fetchActivityFields,
  fetchCompaniesList,
  fetchCompanyInfo,
  removeCompany
} from 'src/services';
import {
  CompaniesResponse,
  GetCompaniesRequest,
  RichViewType
} from 'src/types';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import { ConfirmationDialog, TextFieldFormik } from '@/components/form';
import { toast } from 'react-toastify';
import CreateOrEditForm from './CreateOrEditForm';
import { filterValidationSchema } from './validationSchema';

export default function Companies() {
  const [activityFields, setActivityFields] = useState<RichViewType[]>();
  const [data, setData] = useState<CompaniesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [selectedCompanyForDelete, setSelectedCompanyForDelete] = useState<
    string | number
  >();
  const [selectedCompanyForUpdate, setSelectedCompanyForUpdate] = useState<
    string | number
  >();
  const [companyFullInfo, setCompanyFullInfo] = useState<CompaniesResponse>();
  const [showCreateOrEditForm, setShowCreateOrEditForm] = useState(false);
  const [filter, setFilter] = useState<GetCompaniesRequest>();
  const [clearFlag, setClearFlag] = useState(false);
  const navigate = useNavigate();

  const refetchData = useCallback(() => {
    setData([]);
    setRefetching(true);
    Promise.all([fetchCompaniesList(filter)])
      .then((res) => {
        if (res[0].statusCode === 200) setData(res[0].content);
      })
      .finally(() => setRefetching(false));
  }, [filter]);

  const onSubmit = async (
    values: GetCompaniesRequest,
    actions: FormikHelpers<GetCompaniesRequest>
  ) => {
    setFilter(values);
    setData([]);
    const res = await fetchCompaniesList(values);
    actions.setSubmitting(false);
    if (res.statusCode === 200) setData(res.content);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchActivityFields()])
      .then((res) => {
        if (res[0].statusCode === 200) setActivityFields(res[0].content);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCompanyForUpdate === undefined) return;
    setLoading(true);
    Promise.all([fetchCompanyInfo({ companyId: selectedCompanyForUpdate })])
      .then((res) => {
        if (res[0].statusCode === 200) {
          setCompanyFullInfo(res[0].content);
          setShowCreateOrEditForm(true);
        }
      })
      .finally(() => setLoading(false));
  }, [selectedCompanyForUpdate]);

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
        header: i18n.t('activity_field'),
        accessorKey: 'activityField',
        size: 100
      },
      {
        header: i18n.t('tel'),
        accessorKey: 'tel',
        size: 120
      },
      {
        header: i18n.t('address'),
        accessorKey: 'address',
        size: 120
      }
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>{i18n.t('companies').toString()}</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && activityFields && !showCreateOrEditForm && (
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            activityFields: [],
            name: ''
          }}
          validationSchema={filterValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ setValues, isSubmitting, submitForm, resetForm, errors }) => (
            <Form>
              <Grid
                display={'flex'}
                flexDirection={'column'}
                gap={'30px'}
                mb={'20px'}
              >
                <Grid display={'flex'} flexDirection={'row'} gap={'30px'}>
                  <CustomRichTreeView
                    checkboxSelection={true}
                    multiSelect={true}
                    label={i18n.t('activity_field')}
                    items={mapAllIdsInNestedArray(
                      'activity_field_',
                      activityFields
                    )}
                    onSelectedItemsChange={(_, itemIds) =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        activityFields: itemIds
                      }))
                    }
                    clearFlag={clearFlag}
                    error={errors.activityFields?.toString()}
                  />
                  <TextFieldFormik
                    name="name"
                    sx={{ width: '250px', marginTop: '25px' }}
                    label={i18n.t('company_name').toString()}
                  />
                </Grid>
                {isSubmitting && <InlineLoader />}
                {!isSubmitting && (
                  <OpGrid
                    onSearch={submitForm}
                    onClear={() => {
                      setClearFlag(true);
                      setTimeout(() => {
                        setClearFlag(false);
                      }, 300);
                      resetForm();
                    }}
                    onCreateOrEdit={() => setShowCreateOrEditForm(true)}
                    createOrEditLabel={i18n.t('new_company')}
                    onClose={() => navigate('/repair-panel')}
                  />
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      {!showCreateOrEditForm && (
        <MyCustomTable
          isRefetching={refetching}
          rowActions={({
            row
          }: {
            row: { original: { id: string | number } };
          }) => (
            <TableRowAction
              onDelete={() => setSelectedCompanyForDelete(row.original.id)}
              onEdit={() => setSelectedCompanyForUpdate(row.original.id)}
            />
          )}
          data={data}
          columns={columns}
          enableRowActions={true}
        />
      )}
      {showCreateOrEditForm && (
        <CreateOrEditForm
          activityFields={activityFields}
          existForm={companyFullInfo}
          onSuccess={() => {
            toast.success(
              companyFullInfo
                ? i18n.t('company_updated').toString()
                : i18n.t('company_created').toString()
            );
            setSelectedCompanyForUpdate(undefined);
            setCompanyFullInfo(undefined);
            setShowCreateOrEditForm(false);
            refetchData();
          }}
          onClose={() => {
            setSelectedCompanyForUpdate(undefined);
            setCompanyFullInfo(undefined);
            setShowCreateOrEditForm(false);
          }}
        />
      )}
      {selectedCompanyForDelete && (
        <ConfirmationDialog
          id="remove_modal"
          open={selectedCompanyForDelete !== undefined}
          onClose={() => setSelectedCompanyForDelete(undefined)}
          closeOnEsc={true}
          dialogTitle={i18n.t('confirm_remove')}
          dialogOkBtnAction={() => {
            setLoading(true);
            removeCompany({ companyId: selectedCompanyForDelete })
              .then((res) => {
                if (res.statusCode === 200) {
                  setData(
                    data.filter((e) => e.id !== selectedCompanyForDelete)
                  );
                  toast.success(i18n.t('company_removed').toString());
                }
              })
              .finally(() => setLoading(false));
          }}
        />
      )}
    </>
  );
}
