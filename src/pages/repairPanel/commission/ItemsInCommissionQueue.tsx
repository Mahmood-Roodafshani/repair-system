import { i18n } from '@/localization';
import { CommisionListResponse } from '@/types/responses/repairPanel';
import { GetItemListInCommissionQueueRequest } from '@/types/requests/repairPanel/commission/getItemListInCommissionQueueRequest';
import { Grid, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import commonColumns from './columns';
import { Formik } from 'formik';
import { fetchItemsInCommissionQueue } from '@/services/repairPanel/commissionService';
import CustomDatePicker from '@/components/customDatePicker/CustomDatePicker';
import { Button, ButtonType, TextFieldFormik } from '@/components/form';
import { GetItemListInCommissionQueueResponse } from '@/types/responses/repairPanel/commission/getItemListInCommissionQueueResponse';
import { Box } from '@mui/material';
import { MyCustomTable } from '@/components/customTable';
import { DateObject } from 'react-multi-date-picker';

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

const ItemsInCommissionQueue = () => {
  const [data, setData] = useState<GetItemListInCommissionQueueResponse[]>([]);

  const initialValues: GetItemListInCommissionQueueRequest = {
    assetNumber: '',
    submitNumber: '',
    submitAt: undefined,
    date: undefined,
    submitter: '',
    submitterUnit: '',
    description: '',
    category: '',
    status: '',
    page: 1,
    size: 10,
    sort: ''
  };

  const onSubmit = async (values: GetItemListInCommissionQueueRequest) => {
    const response = await fetchItemsInCommissionQueue(values);
    setData(response);
  };

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

  const rowActions = () => {
    return null;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {i18n.t('items_in_commission_queue')}
      </Typography>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, setValues, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="assetNumber"
                  label="Asset Number"
                  value={values.assetNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="submitNumber"
                  label="Submit Number"
                  value={values.submitNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomDatePicker
                  label="Submit Date"
                  value={values.submitAt}
                  onChange={(date: DateObject) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      submitAt: date?.format('YYYY-MM-DD') || ''
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomDatePicker
                  label="Date"
                  value={values.date}
                  onChange={(date: DateObject) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      date: date?.format('YYYY-MM-DD') || ''
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="submitter"
                  label="Submitter"
                  value={values.submitter}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="submitterUnit"
                  label="Submitter Unit"
                  value={values.submitterUnit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="description"
                  label="Description"
                  value={values.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="category"
                  label="Category"
                  value={values.category}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="status"
                  label="Status"
                  value={values.status}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" buttonType={ButtonType.SEARCH} />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Box mt={2}>
        <MyCustomTable
          data={data}
          columns={columns}
          rowActions={rowActions}
          isLoading={false}
        />
      </Box>
    </Box>
  );
};

export default ItemsInCommissionQueue;
