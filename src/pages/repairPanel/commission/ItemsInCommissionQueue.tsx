import { i18n } from '@/localization';
import { CommisionListResponse } from '@/types/responses/repairPanel';
import { GetItemListInCommissionQueueRequest } from '@/types/requests/repairPanel/commission';
import { Grid, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import commonColumns from './columns';
import { Form, Formik } from 'formik';
import { fetchItemsInCommissionQueue } from '@/services';
import {
  CustomDatePicker,
  MyCustomTable
} from '@/components';
import { Button, ButtonType, TextFieldFormik } from '@/components/form';
import { fetchItemsInCommissionQueueValidationSchema } from './validationSchema';

interface RowType {
  index: number;
  original: CommisionListResponse;
}

interface CellProps {
  row: CommisionListResponse;
  field: keyof CommisionListResponse;
}

const Cell = (props: CellProps) => {
  return <>{props.row[props.field]}</>;
};

function ItemsInCommissionQueue() {
  const [data, setData] = useState<CommisionListResponse[]>([]);
  const columns = useMemo(
    () => [
      {
        header: i18n.t('row_number'),
        enableHiding: false,
        Cell: ({ row }: { row: RowType }) => row.index + 1
      },
      ...commonColumns.map((column) => ({
        ...column,
        Cell: ({ row }: { row: RowType }) => (
          <Cell row={row.original} field={column.accessorKey as keyof CommisionListResponse} />
        )
      }))
    ],
    []
  );

  const onSubmit = async (values: GetItemListInCommissionQueueRequest) => {
    try {
      const response = await fetchItemsInCommissionQueue(values);
      if (response.statusCode === 200) {
        setData(response.content);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const rowActions = () => {
    return null;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{i18n.t('items_in_commission_queue')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={{
            assetNumber: '',
            submitNumber: '',
            submitFrom: undefined,
            submitTo: undefined,
            referFrom: undefined,
            referTo: undefined,
            organizationUnits: undefined
          } as GetItemListInCommissionQueueRequest}
          validationSchema={fetchItemsInCommissionQueueValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextFieldFormik name="assetNumber" label={i18n.t('asset_number')} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextFieldFormik name="submitNumber" label={i18n.t('submit_number')} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomDatePicker
                    label={i18n.t('submit_from')}
                    value={values.submitFrom}
                    onChange={(date) => setFieldValue('submitFrom', date)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomDatePicker
                    label={i18n.t('submit_to')}
                    value={values.submitTo}
                    onChange={(date) => setFieldValue('submitTo', date)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomDatePicker
                    label={i18n.t('refer_from')}
                    value={values.referFrom}
                    onChange={(date) => setFieldValue('referFrom', date)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomDatePicker
                    label={i18n.t('refer_to')}
                    value={values.referTo}
                    onChange={(date) => setFieldValue('referTo', date)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button buttonType={ButtonType.SEARCH} disabled={isSubmitting}>
                    {i18n.t('search')}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item xs={12}>
        <MyCustomTable
          data={data}
          columns={columns}
          rowActions={rowActions}
          isLoading={false}
        />
      </Grid>
    </Grid>
  );
}

export default ItemsInCommissionQueue;
