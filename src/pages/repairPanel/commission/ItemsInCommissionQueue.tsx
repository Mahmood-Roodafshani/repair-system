import { i18n } from '@/localization';
import { GetItemListInCommissionQueueRequest } from '@/types/requests/repairPanel/commission/getItemListInCommissionQueueRequest';
import { Grid, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import commonColumns from './columns';
import { Formik } from 'formik';
import { fetchItemsInCommissionQueue } from '@/services/repairPanel/commissionService';
import CustomDatePicker from '@/components/customDatePicker/CustomDatePicker';
import { Button, ButtonType } from '@/components/form';
import { TextFieldFormik } from '@/components/form/TextFieldFormik';
import { GetItemListInCommissionQueueResponse } from '@/types/responses/repairPanel/commission/getItemListInCommissionQueueResponse';
import { Box } from '@mui/material';
import { MyCustomTable } from '@/components/customTable';
import type { DateObject } from 'react-multi-date-picker';

interface ColumnDef {
  header: string;
  accessorKey: keyof GetItemListInCommissionQueueResponse;
  size?: number;
  enableHiding?: boolean;
  Cell?: ({ row }: { row: { index: number; original: GetItemListInCommissionQueueResponse } }) => JSX.Element;
}

interface CellProps {
  row: GetItemListInCommissionQueueResponse;
  field: keyof GetItemListInCommissionQueueResponse;
}

const Cell = ({ row, field }: CellProps): JSX.Element => {
  return <>{row[field]}</>;
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
      setData(response || []);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = useMemo<ColumnDef[]>(
    () => [
      {
        header: i18n.t('row_number'),
        accessorKey: 'id',
        enableHiding: false,
        Cell: ({ row }) => <>{row.index + 1}</>
      },
      ...commonColumns.map((column) => ({
        header: column.header,
        accessorKey: column.accessorKey as keyof GetItemListInCommissionQueueResponse,
        size: column.size,
        Cell: ({ row }: { row: { index: number; original: GetItemListInCommissionQueueResponse } }) => (
          <Cell row={row.original} field={column.accessorKey as keyof GetItemListInCommissionQueueResponse} />
        )
      }))
    ],
    []
  );

  const rowActions = (): JSX.Element | null => {
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
                  onChange={(date: DateObject | null) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      submitAt: date?.format('YYYY-MM-DD') || undefined
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomDatePicker
                  label="Date"
                  onChange={(date: DateObject | null) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      date: date?.format('YYYY-MM-DD') || undefined
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
