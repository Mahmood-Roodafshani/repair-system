import { useMemo, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { i18n } from 'src/i18n';
import { InlineLoader, MyCustomTable, OpGrid } from 'src/components';
import { BorrowedItemsResponse, GetBorrowedItemsRequest } from 'src/types';
import { Button, ButtonType, TextFieldFormik } from 'src/mahmood-components';
import { fetchBorrowedItemsList } from 'src/service/repairPanel/borrowedItemsService';
import validationSchema from './validationSchema';

function BorrowedItems() {
  const navigate = useNavigate();
  const [data, setData] = useState<BorrowedItemsResponse[]>([]);
  const [showReceiveForm, setShowReceiveForm] = useState(false);
  const onSubmit = async (
    values: GetBorrowedItemsRequest,
    actions: FormikHelpers<GetBorrowedItemsRequest>
  ) => {
    setData([]);
    const res = await fetchBorrowedItemsList(values);
    actions.setSubmitting(false);
    if (res.statusCode === 200) setData(res.content);
  };

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
        header: i18n.t('receiver'),
        accessorKey: 'receiver',
        size: 150
      },
      {
        header: i18n.t('deliverer'),
        accessorKey: 'deliverer',
        size: 100
      },
      {
        header: i18n.t('deliver_at'),
        accessorKey: 'deliverAt',
        size: 100
      },
      {
        header: i18n.t('receive_at'),
        accessorKey: 'receiveAt',
        size: 100
      },
      {
        header: i18n.t('asset_number'),
        accessorKey: 'assetNumber',
        size: 100
      },
      {
        header: i18n.t('item_category'),
        accessorKey: 'category',
        size: 120
      },
      {
        header: i18n.t('submit_at'),
        accessorKey: 'submitAt',
        size: 120
      },
      {
        header: i18n.t('submitter_info'),
        accessorKey: 'submitter',
        size: 120
      }
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>{i18n.t('borrowed_items').toString()}</title>
      </Helmet>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          refCode: '',
          staffCode: ''
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {({ isSubmitting, values, submitForm, resetForm }) => (
          <Form>
            <Grid
              display={'flex'}
              flexDirection={'column'}
              gap={'30px'}
              mb={'20px'}
            >
              <Grid display={'flex'} flexDirection={'row'} gap={'10px'}>
                <TextFieldFormik
                  name="staffCode"
                  label={i18n.t('staff_code').toString()}
                  type="number"
                />
                <TextFieldFormik
                  name="refCode"
                  label={i18n.t('asset_number').toString()}
                />
              </Grid>
              {isSubmitting && <InlineLoader />}
              {!isSubmitting && (
                <OpGrid
                  onClear={resetForm}
                  onClose={() => navigate('/repair-panel')}
                  onSearch={submitForm}
                  additionalBtn={
                    <Button
                      variant="contained"
                      color="secondary"
                      buttonType={ButtonType.SEARCH}
                      showIcon={false}
                      text={i18n.t('fetch_from_central_asset_system')}
                      onClick={() => setShowReceiveForm(true)}
                    />
                  }
                />
              )}
            </Grid>
          </Form>
        )}
      </Formik>
      <MyCustomTable data={data} columns={columns} />
    </>
  );
}

export default BorrowedItems;
