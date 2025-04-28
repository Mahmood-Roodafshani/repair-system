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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const response = await fetchItemsInCommissionQueue(values);
      setData(response);
    } finally {
      setIsLoading(false);
    }
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

  const rowActions = (): null => {
    return null;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {i18n.t('items_in_commission_queue')}
      </Typography>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setValues, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="assetNumber"
                  label="Asset Number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="submitNumber"
                  label="Submit Number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomDatePicker
                  label="Submit Date"
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="submitterUnit"
                  label="Submitter Unit"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="description"
                  label="Description"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="category"
                  label="Category"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldFormik
                  name="status"
                  label="Status"
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
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default ItemsInCommissionQueue;
