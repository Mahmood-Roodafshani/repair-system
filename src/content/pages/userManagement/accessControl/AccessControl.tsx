import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { RichTreeView } from '@mui/x-tree-view';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { Loader, MyCustomTable, OpGrid } from 'src/components';
import i18n from 'src/i18n/i18n';
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
import Grants from './Grants';
import { filterListValidationSchema } from './validationSchema';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function AccessControl() {
  const [roles, setRoles] = useState<RoleResponseType[]>();
  const [organizationUnits, setOrganizationUnits] =
    useState<OrganizationUnitResponseType[]>();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<AccessControlListResponseType[]>();
  const [addNewUser, setAddNewUser] = useState(false);
  const [selectedUserGrants, setSelectedUserGrants] = useState<
    string | number
  >();
  const [expandedOrganizationItems, setExpandedOrganizationItems] = useState<
    string[]
  >([]);
  const [expandedRoleItems, setExpandedRoleItems] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchRoles(), fetchOrganizationUnits()])
      .then((res) => {
        if (res[0].statusCode === 200) {
          setRoles(res[0].content);
          setExpandedRoleItems(res[0].content.map((e) => 'role_' + e.id));
        }
        if (res[1].statusCode === 200) {
          setOrganizationUnits(res[1].content);
          setExpandedOrganizationItems(
            res[1].content.map((e) => 'organization_' + e.id)
          );
        }
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setList(
                            list.map((e) => {
                              if (e.id === row.original.id)
                                e.showPassword = true;
                              return e;
                            })
                          )
                        }
                      >
                        {row.original.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
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
                <Grid
                  display={'flex'}
                  flexDirection={'row'}
                  gap={'20px'}
                  flexWrap={'wrap'}
                >
                  <TextFieldFormik
                    sx={{ width: '250px' }}
                    name="staffCode"
                    label={i18n.t('staff_code').toString()}
                    type="number"
                  />
                  <TextFieldFormik
                    sx={{ width: '250px' }}
                    name="nationalCode"
                    label={i18n.t('national_code').toString()}
                    type="number"
                  />
                  <TextFieldFormik
                    sx={{ width: '250px' }}
                    name="firstname"
                    label={i18n.t('firstname').toString()}
                  />
                  <TextFieldFormik
                    sx={{ width: '250px' }}
                    name="lastname"
                    label={i18n.t('lastname').toString()}
                  />
                  {roles && (
                    <RichTreeView
                      sx={{
                        mt: '10px',
                        width: '500px'
                      }}
                      expandedItems={expandedRoleItems}
                      onExpandedItemsChange={(
                        event: React.SyntheticEvent,
                        itemIds: string[]
                      ) => {
                        setExpandedRoleItems(itemIds);
                      }}
                      items={roles.map((e) => ({
                        id: 'role_' + e.id,
                        label: e.label,
                        children: e.children
                      }))}
                      // onSelectedItemsChange={(event, itemIds) => setSelectedRole(itemIds[0])}
                    />
                  )}
                  {organizationUnits && (
                    <RichTreeView
                      sx={{
                        mt: '10px',
                        width: '500px'
                      }}
                      expandedItems={expandedOrganizationItems}
                      onExpandedItemsChange={(
                        event: React.SyntheticEvent,
                        itemIds: string[]
                      ) => {
                        setExpandedOrganizationItems(itemIds);
                      }}
                      items={organizationUnits.map((e) => ({
                        id: 'organization_' + e.id,
                        label: e.label,
                        children: e.children
                      }))}
                      // onSelectedItemsChange={(event, itemIds) => setSelectedRole(itemIds[0])}
                    />
                  )}
                </Grid>
                <OpGrid
                  sx={{ marginTop: '10px' }}
                  onSearch={submitForm}
                  onClear={() => {
                    setValues({});
                    resetForm();
                  }}
                  onCreateOrEdit={() => setAddNewUser(true)}
                  onCreateOrEditLabel={i18n.t('new_user').toString()}
                  onClose={() => navigate('/usermanagement')}
                />
                {isSubmitting && <Loader />}
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
