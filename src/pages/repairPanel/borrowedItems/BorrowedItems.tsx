import { useMemo, useState, useEffect } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { i18n } from 'src/localization';
import {
  CustomDatePicker,
  CustomRichTreeView,
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid
} from 'src/components';
import {
  BorrowedItemsResponse,
  GetBorrowedItemsRequest,
  RichViewType
} from 'src/types';
import { Button, ButtonType, TextFieldFormik } from '@/components/form';
import validationSchema from './validationSchema';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import { fetchBorrowedItemsList, fetchItemCategoryFields } from 'src/services';

function BorrowedItems() {
  const navigate = useNavigate();
  const [data, setData] = useState<BorrowedItemsResponse[]>([]);
  const [clearFlag, setClearFlag] = useState(false);
  const [itemCategories, setItemCategories] = useState<RichViewType[]>();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (
    values: GetBorrowedItemsRequest,
    actions: FormikHelpers<GetBorrowedItemsRequest>
  ) => {
    setData([]);
    const res = await fetchBorrowedItemsList({
      assetNumber:
        values.assetNumber && values.assetNumber.length > 0
          ? values.assetNumber
          : undefined,
      deliverer:
        values.deliverer && values.deliverer.length > 0
          ? values.deliverer
          : undefined,
      receiver:
        values.receiver && values.receiver.length > 0
          ? values.receiver
          : undefined,
      deliverAt: values.deliverAt,
      receiveAt: values.receiveAt,
      itemCategories: values.itemCategories
    });
    actions.setSubmitting(false);
    if (res.statusCode === 200) setData(res.content);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchItemCategoryFields()])
      .then((res) => {
        if (res[0].statusCode === 200) setItemCategories(res[0].content);
      })
      .finally(() => setLoading(false));
  }, []);

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
      {loading && <Loader />}
      {!loading && (
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            assetNumber: '',
            receiver: '',
            deliverer: ''
          }}
          validationSchema={validationSchema}
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
                    name="deliverer"
                    label={i18n.t('choose_deliverer').toString()}
                    type="number"
                    placeholder={i18n.t('enter_staff_code').toString()}
                  />
                  <TextFieldFormik
                    name="receiver"
                    label={i18n.t('choose_receiver').toString()}
                    type="number"
                    placeholder={i18n.t('enter_staff_code').toString()}
                  />
                  <TextFieldFormik
                    name="assetNumber"
                    label={i18n.t('asset_number').toString()}
                  />
                  <CustomDatePicker
                    label={i18n.t('receive_at')}
                    value={values.receiveAt}
                    onChange={(e) => {
                      setValues((prevValues) => ({
                        ...prevValues,
                        receiveAt: e
                      }));
                    }}
                    error={errors.receiveAt}
                  />
                  <CustomDatePicker
                    label={i18n.t('deliver_at')}
                    value={values.deliverAt}
                    onChange={(e) => {
                      setValues((prevValues) => ({
                        ...prevValues,
                        deliverAt: e
                      }));
                    }}
                    error={errors.deliverAt}
                  />
                  <CustomRichTreeView
                    label={i18n.t('choose_item_category')}
                    sx={{
                      width: '330px'
                    }}
                    items={mapAllIdsInNestedArray(
                      'item_category_',
                      itemCategories
                    )}
                    multiSelect={true}
                    checkboxSelection={true}
                    onSelectedItemsChange={(_, itemIds) =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        itemCategories: itemIds.map((e) =>
                          e.toString().replace('item_category_', '')
                        )
                      }))
                    }
                    clearFlag={clearFlag}
                  />
                </Grid>
                {isSubmitting && <InlineLoader />}
                {!isSubmitting && (
                  <OpGrid
                    onClear={() => {
                      setClearFlag(true);
                      setTimeout(() => {
                        setClearFlag(false);
                      }, 300);
                      resetForm();
                    }}
                    onClose={() => navigate('/repair-panel')}
                    onSearch={submitForm}
                    additionalBtn={
                      <Button
                        variant="contained"
                        color="secondary"
                        buttonType={ButtonType.SEARCH}
                        showIcon={false}
                        text={i18n.t('give_back_borrowed_items')}
                      />
                    }
                  />
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <MyCustomTable data={data} columns={columns} />
    </>
  );
}

export default BorrowedItems;
