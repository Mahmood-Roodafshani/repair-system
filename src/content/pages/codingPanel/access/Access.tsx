import { Delete } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { InlineLoader, Loader, MyCustomTable } from 'src/components';
import { i18n } from 'src/i18n';
import {
  Button,
  ButtonType,
  ConfirmationDialog,
  SelectFormik,
  TextFieldFormik
} from 'src/mahmood-components';
import {
  createCodingAccess,
  fetchCodingAccessList,
  fetchCodingList,
  removeCodingAccess
} from 'src/service';
import {
  CodingAccessRequest,
  CodingAccessResponse,
  CodingResponse
} from 'src/types';
import validationSchema from './validationSchema';

function Access() {
  const [loading, setLoading] = useState(false);
  const [codingList, setCodingList] = useState<CodingResponse[]>();
  const [codingAccessList, setCodingAccessList] =
    useState<CodingAccessResponse[]>();
  const [selectedAccess, setSelectedAccess] = useState<string | number>();
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
        header: i18n.t('username'),
        accessorKey: 'username',
        size: 150
      },
      {
        header: i18n.t('coding_name'),
        accessorKey: 'codingName',
        size: 100
      }
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCodingList(), fetchCodingAccessList()])
      .then((res) => {
        if (res[0].statusCode === 200) setCodingList(res[0].content);
        if (res[1].statusCode === 200) setCodingAccessList(res[1].content);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (
    values: CodingAccessRequest,
    actions: FormikHelpers<CodingAccessRequest>
  ) => {
    const res = await createCodingAccess(values);
    actions.setSubmitting(false);
    if (res.statusCode === 200) {
      toast(i18n.t('new_access_created').toString(), { type: 'success' });
      actions.resetForm();
      setLoading(true);
      Promise.all([fetchCodingAccessList()])
        .then((res) => {
          if (res[0].statusCode === 200) setCodingList(res[0].content);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('coding_access').toString()}</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && codingList && (
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            nationalCode: '',
            codingId: ''
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ isSubmitting, submitForm }) => (
            <Form>
              <Grid display={'flex'} flexDirection={'column'} gap={'10px'}>
                <Grid display={'flex'} flexDirection={'row'} gap={'20px'}>
                  <TextFieldFormik
                    sx={{ width: '250px' }}
                    type="number"
                    placeholder={i18n.t('national_code').toString()}
                    name="nationalCode"
                    label={i18n.t('choose_user').toString()}
                  />
                  <SelectFormik
                    label={i18n.t('coding_name').toString()}
                    sx={{ width: '250px' }}
                    name="codingId"
                    options={codingAccessList.map((item) => ({
                      id: item.id,
                      label: item.codingName
                    }))}
                  />
                </Grid>
                {isSubmitting && <InlineLoader />}
                {!isSubmitting && (
                  <Grid display={'flex'} flexDirection={'row'} gap={'20px'}>
                    <Button
                      buttonType={ButtonType.ADD}
                      text={i18n.t('submit').toString()}
                      onClick={submitForm}
                      showIcon={false}
                    />
                    <Button
                      buttonType={ButtonType.DELETE}
                      color="error"
                      text={i18n.t('close').toString()}
                      onClick={() => navigate('/coding-panel')}
                      showIcon={false}
                    />
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <Grid mt={'20px'}>
        {codingAccessList && (
          <MyCustomTable
            enableRowActions={true}
            rowActions={({
              row
            }: {
              row: { original: { id: string | number } };
            }) => (
              <Grid display={'flex'} flex={'row'} gap={'10px'}>
                <IconButton
                  color="error"
                  onClick={() => setSelectedAccess(row.original.id)}
                >
                  <Delete />
                </IconButton>
              </Grid>
            )}
            columns={columns}
            data={codingAccessList}
          />
        )}
      </Grid>
      {selectedAccess && codingAccessList && (
        <ConfirmationDialog
          id="remove_modal"
          open={selectedAccess !== undefined}
          onClose={() => setSelectedAccess(undefined)}
          closeOnEsc={true}
          dialogTitle={i18n.t('confirm_remove')}
          dialogOkBtnAction={() => {
            setLoading(true);
            removeCodingAccess({ accessId: selectedAccess })
              .then((res) => {
                if (res.statusCode === 200) {
                  setCodingAccessList(
                    codingAccessList.filter((e) => e.id !== selectedAccess)
                  );
                  toast.success(i18n.t('user_removed').toString());
                }
              })
              .finally(() => setLoading(false));
          }}
        />
      )}
    </>
  );
}

export default Access;
