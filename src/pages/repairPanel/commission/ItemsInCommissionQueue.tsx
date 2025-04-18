import { i18n } from '@/localization';
import {
  CommisionListResponse,
  GetItemListInCommissionQueueRequest,
  RichViewType
} from '@/types';
import { Grid, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import commonColumns from './columns';
import { Form, Formik, FormikHelpers } from 'formik';
import { fetchItemsInCommissionQueue } from '@/services';
import {
  CustomDatePicker,
  CustomRichTreeView,
  InlineLoader,
  MyCustomTable,
  OpGrid,
  TableRowAction
} from '@/components';
import { Button, ButtonType, TextFieldFormik } from '@/components/form';
import { fetchItemsInCommissionQueueValidationSchema } from './validationSchema';
import { mapAllIdsInNestedArray } from '@/utils/helper';

function ItemsInCommissionQueue({
  onClose,
  organizationUnits
}: {
  onClose: () => void;
  organizationUnits?: RichViewType[];
}) {
  const [data, setData] = useState<CommisionListResponse[]>([]);
  const [clearFlag, setClearFlag] = useState(false);
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
      ...commonColumns
    ],
    []
  );

  const onSubmit = async (
    values: GetItemListInCommissionQueueRequest,
    actions: FormikHelpers<GetItemListInCommissionQueueRequest>
  ) => {
    setData([]);
    const res = await fetchItemsInCommissionQueue({
      assetNumber:
        values.assetNumber && values.assetNumber.toString().length > 0
          ? values.assetNumber
          : undefined,
      submitNumber:
        values.submitNumber && values.submitNumber.toString().length > 0
          ? values.submitNumber
          : undefined,
      submitFrom: values.submitFrom,
      submitTo: values.submitTo,
      referTo: values.referTo,
      referFrom: values.referFrom,
      organizationUnits: values.organizationUnits
    });
    actions.setSubmitting(false);
    if (res.statusCode === 200) setData(res.content);
  };

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          assetNumber: '',
          submitNumber: ''
        }}
        validationSchema={fetchItemsInCommissionQueueValidationSchema}
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
                <CustomDatePicker
                  label={i18n.t('submit_from')}
                  value={values.submitForm}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      submitForm: e
                    }));
                  }}
                  error={errors.submitForm}
                />
                <CustomDatePicker
                  label={i18n.t('submit_to')}
                  value={values.submitTo}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      submitTo: e
                    }));
                  }}
                  error={errors.submitTo}
                />
                <TextFieldFormik
                  name="assetNumber"
                  label={i18n.t('asset_number').toString()}
                />
                <TextFieldFormik
                  name="submitNumber"
                  label={i18n.t('submit_number').toString()}
                />
                <CustomDatePicker
                  label={i18n.t('refer_from')}
                  value={values.referForm}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      referForm: e
                    }));
                  }}
                  error={errors.referForm}
                />
                <CustomDatePicker
                  label={i18n.t('refer_to')}
                  value={values.referTo}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      referTo: e
                    }));
                  }}
                  error={errors.referTo}
                />
              </Grid>
              {organizationUnits && (
                <CustomRichTreeView
                  clearFlag={clearFlag}
                  checkboxSelection={true}
                  multiSelect={true}
                  label={i18n.t('choose_work_unit')}
                  items={mapAllIdsInNestedArray(
                    'organization_unit_',
                    organizationUnits
                  )}
                  onSelectedItemsChange={(_, itemIds) =>
                    setValues((prevValues) => ({
                      ...prevValues,
                      organizationUnits: itemIds
                    }))
                  }
                  error={errors.organizationUnits}
                />
              )}
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
                  onClose={onClose}
                  onSearch={submitForm}
                />
              )}
            </Grid>
          </Form>
        )}
      </Formik>

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
            additionalIconButton={
              <Button
                variant="contained"
                color="secondary"
                buttonType={ButtonType.SEARCH}
                showIcon={false}
                text={i18n.t('refer_to_commission')}
              />
            }
          />
        )}
        data={data}
        columns={columns}
      />
    </>
  );
}

export default ItemsInCommissionQueue;
