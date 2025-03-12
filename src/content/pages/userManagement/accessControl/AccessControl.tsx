import { Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import {
  CustomRichTreeView,
  Loader,
  MyCustomTable,
  OpGrid
} from 'src/components';
import i18n from 'src/i18n/i18n';
import { Button, ButtonType, TextFieldFormik } from 'src/mahmood-components';
import {
  accessControlFetchList,
  fetchJobsTree,
  fetchOrganizationUnits,
  fetchRoles
} from 'src/service';
import {
  AccessControlFilterType,
  AccessControlListResponseType,
  RichViewType
} from 'src/types';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import Grants from './Grants';
import { filterListValidationSchema } from './validationSchema';
import NewAccess from './NewAccess';

function AccessControl() {
  const [roles, setRoles] = useState<RichViewType[]>();
  const [jobs, setJobs] = useState<RichViewType[]>();
  const [organizationUnits, setOrganizationUnits] = useState<RichViewType[]>();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<AccessControlListResponseType[]>();
  const [addNewAccess, setAddNewAccess] = useState(false);
  const [filter, setFilter] = useState<AccessControlFilterType>();
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

  useEffect(() => {
    if (addNewAccess && jobs === undefined) {
      setLoading(true);
      Promise.all([fetchJobsTree()])
        .then((res) => {
          if (res[0].statusCode === 200) setJobs(res[0].content);
        })
        .finally(() => setLoading(false));
    }
  }, [addNewAccess, jobs]);

  const onSubmit = async (
    values: AccessControlFilterType,
    actions: FormikHelpers<AccessControlFilterType>
  ) => {
    setFilter(values);
    setList(undefined);
    const res = await accessControlFetchList({ filter: values });
    actions.setSubmitting(false);
    if (res.statusCode === 200) setList(res.content);
  };

  const columns = useMemo(() => {
    return [
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
        header: i18n.t('fullname'),
        accessorKey: 'name'
      },
      {
        header: i18n.t('staff_code'),
        accessorKey: 'staffCode'
      },
      {
        header: i18n.t('status'),
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
        header: i18n.t('change_pass'),
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
            </Grid>
          );
        }
      },
      {
        header: i18n.t('work_unit'),
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
      {!loading && !selectedUserGrants && !addNewAccess && (
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
                    <CustomRichTreeView
                      label={i18n.t('choose_role')}
                      items={mapAllIdsInNestedArray('role_', roles)}
                      sx={{ width: '500px' }}
                    />
                  )}
                  {organizationUnits && (
                    <CustomRichTreeView
                      sx={{
                        width: '500px'
                      }}
                      label={i18n.t('organization_unit')}
                      items={mapAllIdsInNestedArray(
                        'organization_',
                        organizationUnits
                      )}
                      // onSelectedItemsChange={(event, itemIds) => setSelectedRole(itemIds[0])}
                    />
                  )}
                </Grid>
                <OpGrid
                  sx={{ marginTop: '10px', marginBottom: '20px' }}
                  onSearch={submitForm}
                  onClear={() => {
                    setValues({});
                    resetForm();
                  }}
                  onCreateOrEdit={() => setAddNewAccess(true)}
                  createOrEditLabel={i18n.t('new_user').toString()}
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
                <IconButton color="secondary" onClick={() => {}}>
                  <Edit />
                </IconButton>
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
      {addNewAccess && jobs && (
        <NewAccess
          onSubmit={async () => {
            setAddNewAccess(false);
            setLoading(true);
            setList(undefined);
            const res = await accessControlFetchList({ filter: filter });
            setLoading(false);
            if (res.statusCode === 200) setList(res.content);
          }}
          jobs={jobs}
          onClose={() => setAddNewAccess(false)}
        />
      )}
    </>
  );
}

export default AccessControl;
