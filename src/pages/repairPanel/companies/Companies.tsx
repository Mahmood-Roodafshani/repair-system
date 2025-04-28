import { Grid } from '@mui/material';
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
  fetchCompaniesList,
  fetchCompanyInfo,
  deleteCompany
} from 'src/services';
import CommonService from 'src/services/CommonService';
import {
  CompaniesResponse,
  RichViewType
} from 'src/types';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import { ConfirmationDialog, TextFieldFormik } from '@/components/form';
import { toast } from 'react-toastify';
import CreateOrEditForm from './CreateOrEditForm';
import { filterValidationSchema } from './validationSchema';

interface FilterFormValues {
  name: string;
  activityFields: string[];
}

interface GetCompaniesRequest {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
}

interface ActivityFieldsResponse {
  statusCode: number;
  content: RichViewType[];
}

export default function Companies() {
  const [activityFields, setActivityFields] = useState<RichViewType[]>([]);
  const [data, setData] = useState<CompaniesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [selectedCompanyForDelete, setSelectedCompanyForDelete] = useState<string | number>();
  const [selectedCompanyForUpdate, setSelectedCompanyForUpdate] = useState<string | number>();
  const [companyFullInfo, setCompanyFullInfo] = useState<CompaniesResponse>();
  const [showCreateOrEditForm, setShowCreateOrEditForm] = useState(false);
  const [filter, setFilter] = useState<FilterFormValues>({ name: '', activityFields: [] });
  const [clearFlag, setClearFlag] = useState(false);
  const navigate = useNavigate();

  const refetchData = useCallback(() => {
    setData([]);
    setRefetching(true);
    const request: GetCompaniesRequest = {
      search: filter.name,
      sort: filter.activityFields.join(',')
    };
    fetchCompaniesList(request)
      .then((res) => {
        if (res?.statusCode === 200) setData(res.content || []);
      })
      .finally(() => setRefetching(false));
  }, [filter]);

  const onSubmit = async (
    values: FilterFormValues,
    actions: FormikHelpers<FilterFormValues>
  ) => {
    setFilter(values);
    setData([]);
    const request: GetCompaniesRequest = {
      search: values.name,
      sort: values.activityFields.join(',')
    };
    const res = await fetchCompaniesList(request);
    actions.setSubmitting(false);
    if (res?.statusCode === 200) setData(res.content || []);
  };

  useEffect(() => {
    setLoading(true);
    CommonService.getActivityFields()
      .then((res: unknown) => {
        const response = res as ActivityFieldsResponse;
        if (response?.statusCode === 200) setActivityFields(response.content || []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCompanyForUpdate === undefined) return;
    setLoading(true);
    fetchCompanyInfo(selectedCompanyForUpdate.toString())
      .then((res) => {
        if (res?.statusCode === 200) {
          setCompanyFullInfo(res.content);
          setShowCreateOrEditForm(true);
        }
      })
      .finally(() => setLoading(false));
  }, [selectedCompanyForUpdate]);

  const columns = useMemo(
    () => [
      {
        Header: i18n.t('row_number'),
        accessor: 'index',
        width: 60
      },
      {
        Header: i18n.t('company_name'),
        accessor: 'name'
      },
      {
        Header: i18n.t('activity_field'),
        accessor: 'activityField'
      },
      {
        Header: i18n.t('tel'),
        accessor: 'tel'
      },
      {
        Header: i18n.t('address'),
        accessor: 'address'
      },
      {
        Header: i18n.t('ceo'),
        accessor: 'ceo'
      },
      {
        Header: i18n.t('email'),
        accessor: 'email'
      },
      {
        Header: i18n.t('status'),
        accessor: 'canBePartner',
        Cell: ({ value }: { value: boolean }) =>
          value ? i18n.t('can_be_partner') : i18n.t('can_not_be_partner')
      }
    ],
    []
  );

  const handleConfirmDelete = async () => {
    if (!selectedCompanyForDelete) return;
    try {
      await deleteCompany(selectedCompanyForDelete.toString());
      toast.success('Company deleted successfully');
      await fetchCompaniesList({});
      setSelectedCompanyForDelete(undefined);
    } catch (error) {
      toast.error('Failed to delete company');
    }
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('companies').toString()}</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && activityFields && !showCreateOrEditForm && (
        <Formik<FilterFormValues>
          onSubmit={onSubmit}
          initialValues={{
            name: '',
            activityFields: []
          }}
          validationSchema={filterValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ setValues, isSubmitting, submitForm, resetForm, errors }) => (
            <Form>
              <Grid display={'flex'} flexDirection={'column'} gap={'30px'} mb={'20px'}>
                <Grid display={'flex'} flexDirection={'row'} gap={'30px'}>
                  <CustomRichTreeView
                    checkboxSelection={true}
                    multiSelect={true}
                    label={i18n.t('activity_field')}
                    items={mapAllIdsInNestedArray('activity_field_', activityFields)}
                    onSelectedItemsChange={(_, itemIds) =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        activityFields: itemIds as string[]
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
          dialogOkBtnAction={handleConfirmDelete}
        />
      )}
    </>
  );
}
