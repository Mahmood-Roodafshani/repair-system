import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Button as MButton,
  TextField,
  Typography
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader, MyCustomTable } from 'src/components';
import { Button, ButtonType, TextFieldFormik } from 'src/mahmood-components';
import {
  accessControlFetchList,
  fetchOrganizationUnits,
  fetchRoles
} from 'src/service';
import {
  AccessControlFilterType,
  AccessControlListResponseType,
  OrganizationUnitResponseType,
  RoleResponseType
} from 'src/types';
import { filterListValidationSchema } from './validationSchema';
import i18n from 'src/i18n/i18n';
import { useNavigate } from 'react-router';
import Grants from './Grants';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

function AccessControl() {
  const [filter, setFilter] = useState<AccessControlFilterType>();
  const [roles, setRoles] = useState<RoleResponseType[]>();
  const [organizationUnits, setOrganizationUnits] =
    useState<OrganizationUnitResponseType[]>();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<AccessControlListResponseType[]>();
  const [addNewUser, setAddNewUser] = useState(false);
  const [selectedUserGrants, setSelectedUserGrants] = useState<
    string | number
  >();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchRoles(), fetchOrganizationUnits()])
      .then((res) => {
        if (res[0].statusCode === 200) setRoles(res[0].content);
        if (res[1].statusCode === 200) setOrganizationUnits(res[1].content);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (
    values: AccessControlFilterType,
    actions: FormikHelpers<AccessControlFilterType>
  ) => {
    const res = await accessControlFetchList({ filter: values });
    actions.setSubmitting(false);
    if (res.statusCode === 200) setList(res.content);
  };

  const columns = useMemo(() => {
    return [
      {
        header: 'ردیف',
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
        header: 'نام و نام خانوادگی',
        accessorKey: 'name'
      },
      {
        header: 'شماره پرسنلی',
        accessorKey: 'staffCode'
      },
      {
        header: 'وضعیت',
        Cell: ({ row }) => {
          return (
            <FormControlLabel
              control={<Checkbox checked={row.original.status} />}
              label={
                row.original.status
                  ? i18n.t('active').toString()
                  : i18n.t('deactive').toString()
              }
            />
          );
        }
      },
      {
        header: 'تغییر رمز',
        Cell: ({ row }) => {
          return (
            <Grid
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
            >
              <TextField
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <IconButton
                //         onClick={() =>
                //           setList(
                //             list.map((e) => {
                //               if (e.id === row.original.id)
                //                 e.showPassword = true;
                //               return e;
                //             })
                //           )
                //         }
                //       >
                //         {row.original.showPassword ? (
                //           <Visibility />
                //         ) : (
                //           <VisibilityOff />
                //         )}
                //       </IconButton>
                //     </InputAdornment>
                //   )
                // }}
                onChange={(event) =>
                  setList(
                    list.map((e) => {
                      if (e.id === row.original.id)
                        e.newPasswrod = event.target.value;
                      return e;
                    })
                  )
                }
                type="password"
              />
              {/* <IconButton
                key={'show_btn_' + row.index}
                color="primary"
                onClick={() => console.info('Edit')}
              >
                <Add />
              </IconButton> */}
            </Grid>
          );
        }
      },
      {
        header: 'یگان خدمتی',
        accessorKey: 'unit'
      }
    ];
  }, []);

  return (
    <>
      <Helmet>
        <title>{i18n.t('access_control').toString()}</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && !selectedUserGrants && (
        <Grid>
          <Formik
            onSubmit={onSubmit}
            initialValues={{}}
            validationSchema={filterListValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
          >
            {({ setValues, isSubmitting, submitForm, resetForm }) => (
              <Form>
                <Grid display={'flex'} flexDirection={'row'} gap={'20px'}>
                  <TextFieldFormik
                    name="staffCode"
                    label={i18n.t('staff_code').toString()}
                    type="number"
                  />
                  <TextFieldFormik
                    name="nationalCode"
                    label={i18n.t('national_code').toString()}
                    type="number"
                  />
                  <TextFieldFormik
                    name="firstname"
                    label={i18n.t('firstname').toString()}
                  />
                  <TextFieldFormik
                    name="lastname"
                    label={i18n.t('lastname').toString()}
                  />
                </Grid>
                <Grid
                  ml={'20px'}
                  mt={'20px'}
                  display={'flex'}
                  flexDirection={'row'}
                  gap={'10px'}
                >
                  <LoadingButton
                    loading={isSubmitting}
                    variant="contained"
                    onClick={() => submitForm()}
                  >
                    {i18n.t('search').toString()}
                  </LoadingButton>
                  <Button
                    color="warning"
                    onClick={() => {
                      setValues({});
                      resetForm();
                    }}
                    showIcon={false}
                    buttonType={ButtonType.CLEAR}
                  />
                  <MButton
                    variant="contained"
                    color="success"
                    onClick={() => setAddNewUser(true)}
                  >
                    {i18n.t('new_user').toString()}
                  </MButton>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => navigate('/usermanagement')}
                    buttonType={ButtonType.CLOSE}
                  />
                </Grid>
              </Form>
            )}
          </Formik>
          {list && (
            <MyCustomTable
              enableRowActions={true}
              rowActions={({
                row
              }: {
                row: { original: { id: string | number } };
              }) => (
                <Button
                  onClick={() => setSelectedUserGrants(row.original.id)}
                  showText={false}
                  buttonType={ButtonType.EDIT}
                />
              )}
              data={list}
              columns={columns}
            />
          )}
        </Grid>
      )}
      {selectedUserGrants && (
        <Grants
          userId={selectedUserGrants}
          onClose={() => setSelectedUserGrants(undefined)}
        />
      )}
    </>
  );
}

export default AccessControl;
