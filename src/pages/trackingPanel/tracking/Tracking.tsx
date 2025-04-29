import { Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  CustomDatePicker,
  CustomRichTreeView,
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid
} from 'src/components';
import { i18n } from 'src/localization';
import { SelectFormik, TextFieldFormik } from '@/components/form';
import CommonService from 'src/services/CommonService';
import {
  fetchMainSystems,
  fetchTrackingList
} from 'src/services/tracking/trackingService';
import {
  RichViewType,
  TrackingFilterRequestType,
  TrackingResponseType
} from 'src/types';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import validationSchema from './validationSchema';
import { OptionType } from 'src/constant/options';

function Tracking() {
  const [organizationUnits, setOrganizationUnits] = useState<RichViewType[]>();
  const [activities, setActivities] = useState<OptionType[]>();
  const [systems, setSystems] = useState<RichViewType[]>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TrackingResponseType[]>([]);
  const [clearFlag, setClearFlag] = useState(false);

  const initialValues: TrackingFilterRequestType = {
    activity: '',
    nationalCode: '',
    forms: [],
    organizationUnits: [],
    from: undefined,
    to: undefined
  };

  const onSubmit = async (
    _: TrackingFilterRequestType,
    actions: FormikHelpers<TrackingFilterRequestType>
  ) => {
    setData([]);
    const res = await fetchTrackingList();
    actions.setSubmitting(false);
    if (res.statusCode === 200) setData(res.content);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      CommonService.getOrganizationUnits(),
      fetchMainSystems(),
      CommonService.getActivities()
    ])
      .then(([orgUnits, systemsRes, activities]) => {
        setOrganizationUnits(orgUnits);
        if (systemsRes.statusCode === 200) setSystems(systemsRes.content);
        setActivities(activities);
      })
      .finally(() => setLoading(false));
  }, []);

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
      {
        header: i18n.t('fullname'),
        accessorKey: 'username',
        size: 150
      },
      {
        header: i18n.t('form_name'),
        accessorKey: 'formName',
        size: 100
      },
      {
        header: i18n.t('time'),
        accessorKey: 'time',
        size: 80
      },
      {
        header: i18n.t('date'),
        accessorKey: 'date',
        size: 100
      },
      {
        header: i18n.t('ip'),
        accessorKey: 'ip',
        size: 120
      },
      {
        header: i18n.t('operation'),
        accessorKey: 'action'
      }
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>{i18n.t('tracking').toString()}</title>
      </Helmet>
      {loading && <Loader />}
      {activities && systems && (
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({
            values,
            setValues,
            isSubmitting,
            submitForm,
            resetForm,
            errors
          }) => (
            <Form>
              <Grid display={'flex'} flexDirection={'column'} gap={'30px'}>
                <Grid
                  display={'flex'}
                  flexDirection={'row'}
                  gap={'20px'}
                  flexWrap="wrap"
                >
                  <CustomRichTreeView
                    checkboxSelection={true}
                    multiSelect={true}
                    label={i18n.t('choose_form')}
                    items={mapAllIdsInNestedArray('form_', systems)}
                    onSelectedItemsChange={(_, itemIds) =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        forms: Array.isArray(itemIds) ? itemIds : [itemIds]
                      }))
                    }
                    clearFlag={clearFlag}
                    error={errors.forms?.toString()}
                  />
                  <CustomRichTreeView
                    checkboxSelection={true}
                    multiSelect={true}
                    label={i18n.t('organization_unit')}
                    items={mapAllIdsInNestedArray(
                      'organization_unit_',
                      organizationUnits
                    )}
                    onSelectedItemsChange={(_, itemIds) =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        organizationUnits: Array.isArray(itemIds) ? itemIds : [itemIds]
                      }))
                    }
                    clearFlag={clearFlag}
                    error={errors.organizationUnits?.toString()}
                  />
                </Grid>
                <Grid
                  display={'flex'}
                  flexDirection={'row'}
                  gap={'20px'}
                  flexWrap="wrap"
                >
                  <SelectFormik
                    sx={{ width: '330px' }}
                    options={activities}
                    name="activity"
                    label={i18n.t('choose_activity').toString()}
                    clearFlag={clearFlag}
                  />
                  <TextFieldFormik
                    name="nationalCode"
                    type="number"
                    placeholder={i18n.t('enter_national_code')}
                    label={i18n.t('user').toString()}
                    clearFlag={clearFlag}
                  />
                  <CustomDatePicker
                    label={i18n.t('from')}
                    value={values.from}
                    onChange={(e) => {
                      setValues((prevValues) => ({
                        ...prevValues,
                        from: e
                      }));
                    }}
                    error={errors.from}
                  />
                  <CustomDatePicker
                    label={i18n.t('to')}
                    value={values.to}
                    onChange={(e) => {
                      setValues((prevValues) => ({
                        ...prevValues,
                        to: e
                      }));
                    }}
                    error={errors.to}
                  />
                </Grid>
                {isSubmitting && <InlineLoader />}
                {!isSubmitting && (
                  <OpGrid
                    onClear={() => {
                      resetForm();
                      setClearFlag(true);
                      setTimeout(() => {
                        setClearFlag(false);
                      }, 300);
                    }}
                    onSearch={submitForm}
                  />
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <Grid mt={'20px'}>
        {data && <MyCustomTable columns={columns} data={data} />}
      </Grid>
    </>
  );
}

export default Tracking;
