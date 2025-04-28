import {
  CustomDatePicker,
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid,
  TableRowAction
} from '@/components';
import { Button, ButtonType, TextFieldFormik } from '@/components/form';
import { i18n } from '@/localization';
import { fetchCommissionList } from '@/services';
import CommonService from '@/services/CommonService';
import {
  CommisionListResponse,
  GetCommissionListRequest,
  RichViewType
} from '@/types';
import { Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import CreateOrEditForm from './CreateOrEditForm';
import commonColumns from './columns';
import ItemsInCommissionQueue from './ItemsInCommissionQueue';
import { fetchCommissionListValidationSchema } from './validationSchema';

export default function Commission() {
  const [data, setData] = useState<CommisionListResponse[]>([]);
  const [selectedCommissionForEdit, setSelectedCommissionForEdit] =
    useState<CommisionListResponse>();
  const [showCreateOrEditForm, setShowCreateOrEditForm] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [organizationUnits, setOrganizationUnits] = useState<RichViewType[]>();

  const navigate = useNavigate();
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
      ...commonColumns
    ],
    []
  );

  useEffect(() => {
    setShowCreateOrEditForm(selectedCommissionForEdit !== undefined);
  }, [selectedCommissionForEdit]);

  useEffect(() => {
    setLoading(true);
    CommonService.getOrganizationUnits()
      .then((res) => {
        setOrganizationUnits(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (
    values: GetCommissionListRequest,
    actions: FormikHelpers<GetCommissionListRequest>
  ) => {
    setData([]);
    const res = await fetchCommissionList({
      assetNumber:
        values.assetNumber && values.assetNumber.toString().length > 0
          ? values.assetNumber
          : undefined,
      submitAt: values.submitAt,
      date: values.date
    });
    actions.setSubmitting(false);
    if (res.statusCode === 200) setData(res.content);
  };

  const handleShowQueue = async () => {
    if (organizationUnits === undefined) {
      setLoading(true);
      const res = await CommonService.getOrganizationUnits();
      setLoading(false);
      setOrganizationUnits(res);
    }
    setShowQueue(true);
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('commision')}</title>
      </Helmet>
      {loading && <Loader />}
      {!showCreateOrEditForm && !showQueue && (
        <>
          <Formik<GetCommissionListRequest>
            onSubmit={onSubmit}
            initialValues={{
              assetNumber: '',
              submitAt: undefined,
              date: undefined
            }}
            validationSchema={fetchCommissionListValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
          >
            {({
              isSubmitting,
              values,
              setValues,
              submitForm,
              resetForm,
              errors
            }) => (
              <Form>
                <Grid
                  display={'flex'}
                  flexDirection={'column'}
                  gap={'30px'}
                  mb={'20px'}
                >
                  <Grid
                    display={'flex'}
                    flexDirection={'row'}
                    gap={'10px'}
                    flexWrap={'wrap'}
                  >
                    <TextFieldFormik
                      name="assetNumber"
                      label={i18n.t('asset_number').toString()}
                    />
                    <CustomDatePicker
                      label={i18n.t('submit_at')}
                      value={values.submitAt}
                      onChange={(e) => {
                        setValues((prevValues) => ({
                          ...prevValues,
                          submitAt: e
                        }));
                      }}
                      error={errors.submitAt}
                    />
                    <CustomDatePicker
                      label={i18n.t('commision_date')}
                      value={values.date}
                      onChange={(e) => {
                        setValues((prevValues) => ({
                          ...prevValues,
                          date: e
                        }));
                      }}
                      error={errors.date}
                    />
                  </Grid>
                  {isSubmitting && <InlineLoader />}
                  {!isSubmitting && (
                    <OpGrid
                      onClear={() => resetForm()}
                      onClose={() => navigate('/repair-panel')}
                      onSearch={submitForm}
                      additionalBtn={
                        <Button
                          onClick={() => setShowCreateOrEditForm(true)}
                          variant="contained"
                          color="secondary"
                          buttonType={ButtonType.SEARCH}
                          showIcon={false}
                          text={i18n.t('new_comission')}
                        />
                      }
                    />
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
          <Grid
            display={'flex'}
            flexDirection={'column'}
            gap={'10px'}
            alignItems={'end'}
          >
            <Button
              onClick={handleShowQueue}
              sx={{ width: '250px' }}
              variant="contained"
              color="info"
              buttonType={ButtonType.SEARCH}
              showIcon={false}
              text={i18n.t('items_in_commission_queue')}
            />
            <MyCustomTable
              enableRowActions={true}
              rowActions={({
                row
              }: {
                row: {
                  index: number;
                  original: {
                    id: string | number;
                  };
                };
              }) => (
                <TableRowAction
                  onEdit={() =>
                    setSelectedCommissionForEdit(
                      data.find((e) => e.id === row.original.id)
                    )
                  }
                />
              )}
              data={data}
              columns={columns}
            />
          </Grid>
        </>
      )}
      {showQueue && <ItemsInCommissionQueue />}
      {showCreateOrEditForm && (
        <CreateOrEditForm
          selectedItemForEdit={selectedCommissionForEdit}
          onSuccess={() => {
            setShowCreateOrEditForm(false);
            setSelectedCommissionForEdit(undefined);
          }}
          onClose={() => {
            setShowCreateOrEditForm(false);
            setSelectedCommissionForEdit(undefined);
          }}
        />
      )}
    </>
  );
}
