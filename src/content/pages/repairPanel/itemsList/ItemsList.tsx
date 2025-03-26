import { Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { InlineLoader, MyCustomTable, OpGrid } from 'src/components';
import { i18n } from 'src/i18n';
import { Button, ButtonType, TextFieldFormik } from 'src/mahmood-components';
import {
  fetchItemsList,
  fetchItemsListFromCentralAssetPanel
} from 'src/service';
import { GetItemsRequest, ItemsResponse } from 'src/types';
import validationSchema from './validationSchema';

function ItemsList() {
  const [data, setData] = useState<ItemsResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (values: GetItemsRequest) => {
    setIsSubmitting(true);
    setData([]);
    const res = await fetchItemsList(values);
    setIsSubmitting(false);
    if (res.statusCode === 200) setData(res.content);
  };
  const onSearchFromCentralAssetPanel = async (values: GetItemsRequest) => {
    setIsSubmitting(true);
    setData([]);
    const res = await fetchItemsListFromCentralAssetPanel(values);
    setIsSubmitting(false);
    if (res.statusCode === 200) setData(res.content);
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
        header: i18n.t('asset_number'),
        accessorKey: 'refCode',
        size: 150
      },
      {
        header: i18n.t('title'),
        accessorKey: 'title',
        size: 100
      },
      {
        header: i18n.t('group'),
        accessorKey: 'category',
        size: 120
      }
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>{i18n.t('items_list').toString()}</title>
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
        {({ values, submitForm, resetForm }) => (
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
                      onClick={() => onSearchFromCentralAssetPanel(values)}
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

export default ItemsList;
