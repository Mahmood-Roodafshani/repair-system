import { useMemo, useState, useEffect } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Grid } from '@mui/material';
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
import { getBorrowedItemsList } from '../../../services/repairPanel/borrowedItemsService';
import validationSchema from './validationSchema';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import CommonService from 'src/services/CommonService';
import { SyntheticEvent } from 'react';

interface BorrowedItem {
  id: string;
  itemName: string;
  borrowerName: string;
  borrowDate: string;
  returnDate?: string;
}

interface ApiResponse<T> {
  statusCode: number;
  content: T;
}

function BorrowedItems() {
  const navigate = useNavigate();
  const [data, setData] = useState<BorrowedItemsResponse[]>([]);
  const [clearFlag, setClearFlag] = useState(false);
  const [itemCategories, setItemCategories] = useState<RichViewType[]>([]);
  const [loading, setLoading] = useState(false);

  const initialValues: GetBorrowedItemsRequest = {
    assetNumber: '',
    receiver: '',
    deliverer: '',
    deliverAt: undefined,
    receiveAt: undefined,
    itemCategories: []
  };

  const onSubmit = async (
    values: GetBorrowedItemsRequest,
    actions: FormikHelpers<GetBorrowedItemsRequest>
  ) => {
    setData([]);
    try {
      const requestParams: GetBorrowedItemsRequest = {
        assetNumber: values.assetNumber || undefined,
        deliverer: values.deliverer || undefined,
        receiver: values.receiver || undefined,
        deliverAt: values.deliverAt,
        receiveAt: values.receiveAt,
        itemCategories: values.itemCategories?.length ? values.itemCategories : undefined
      };
      const res = await getBorrowedItemsList(requestParams);
      actions.setSubmitting(false);
      if (res.statusCode === 200) {
        setData(res.content);
      }
    } catch (error) {
      actions.setSubmitting(false);
      console.error('Error fetching borrowed items:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    CommonService.getItemCategoryFields()
      .then((response: unknown) => {
        const res = response as ApiResponse<RichViewType[]>;
        if (res.statusCode === 200) {
          setItemCategories(res.content);
        }
      })
      .catch((error) => {
        console.error('Error fetching item categories:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'assetNumber',
        headerName: i18n.t('asset_number'),
        width: 150
      },
      {
        field: 'category',
        headerName: i18n.t('category'),
        width: 200
      },
      {
        field: 'deliverer',
        headerName: i18n.t('deliverer'),
        width: 150
      },
      {
        field: 'receiver',
        headerName: i18n.t('receiver'),
        width: 150
      },
      {
        field: 'deliverAt',
        headerName: i18n.t('deliver_at'),
        width: 150
      },
      {
        field: 'receiveAt',
        headerName: i18n.t('receive_at'),
        width: 150
      },
      {
        field: 'submitter',
        headerName: i18n.t('submitter'),
        width: 150
      },
      {
        field: 'submitAt',
        headerName: i18n.t('submit_at'),
        width: 150
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
          initialValues={initialValues}
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
                <Grid display={'flex'} gap={'30px'} flexWrap={'wrap'}>
                  <TextFieldFormik
                    name="assetNumber"
                    label={i18n.t('asset_number')}
                    sx={{ width: '330px' }}
                  />
                  <TextFieldFormik
                    name="receiver"
                    label={i18n.t('receiver')}
                    sx={{ width: '330px' }}
                  />
                  <TextFieldFormik
                    name="deliverer"
                    label={i18n.t('deliverer')}
                    sx={{ width: '330px' }}
                  />
                </Grid>
                <Grid display={'flex'} gap={'30px'} flexWrap={'wrap'}>
                  <CustomDatePicker
                    label={i18n.t('deliver_at')}
                    value={values.deliverAt}
                    onChange={(date) => {
                      setValues((prevValues) => ({
                        ...prevValues,
                        deliverAt: date
                      }));
                    }}
                    error={errors.deliverAt}
                    width="330px"
                  />
                  <CustomDatePicker
                    label={i18n.t('receive_at')}
                    value={values.receiveAt}
                    onChange={(date) => {
                      setValues((prevValues) => ({
                        ...prevValues,
                        receiveAt: date
                      }));
                    }}
                    error={errors.receiveAt}
                    width="330px"
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
                    onSelectedItemsChange={(
                      _: SyntheticEvent<Element, Event>,
                      itemIds: string | string[]
                    ) => {
                      const selectedIds = Array.isArray(itemIds)
                        ? itemIds
                        : [itemIds];
                      const selectedCategories = selectedIds.map((id) =>
                        id.toString().replace('item_category_', '')
                      );
                      setValues((prevValues) => ({
                        ...prevValues,
                        itemCategories: selectedCategories
                      }));
                    }}
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
