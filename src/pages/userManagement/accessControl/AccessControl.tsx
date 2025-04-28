import {Edit, Visibility, VisibilityOff, Add} from '@mui/icons-material';
import {Box, Button, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import {Form, Formik, FormikHelpers} from 'formik';
import {useEffect, useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router';
import {CustomRichTreeView, Loader, MyCustomTable, OpGrid} from 'src/components';
import {i18n} from 'src/localization';
import {TextFieldFormik} from '@/components/form';
import { accessControlFetchList } from 'src/services/userManagement/accessControlService';
import { fetchJobsTree } from 'src/services/jobsPanel/jobsPanelService';
import CommonService from 'src/services/CommonService';
import {AccessControlFilterType, AccessControlListResponseType, RichViewType} from 'src/types';
import {mapAllIdsInNestedArray} from 'src/utils/helper';
import Grants from './Grants';
import {filterListValidationSchema} from './validationSchema';
import NewAccess from './NewAccess';

interface TableRow extends AccessControlListResponseType {
    showPassword?: boolean;
    newPasswrod?: string;
}

function AccessControl() {
    const [roles, setRoles] = useState<RichViewType[]>([]);
    const [jobs, setJobs] = useState<RichViewType[]>([]);
    const [organizationUnits, setOrganizationUnits] = useState<RichViewType[]>([]);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<TableRow[]>([]);
    const [addNewAccess, setAddNewAccess] = useState(false);
    const [filter, setFilter] = useState<AccessControlFilterType>({
        staffCode: '',
        nationalCode: '',
        firstname: '',
        lastname: '',
        roles: [],
        organizationUnits: []
    });
    const [selectedUserGrants, setSelectedUserGrants] = useState<string | number | undefined>();
    const [clearFlag, setClearFlag] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        Promise.all([CommonService.getRoles(), CommonService.getOrganizationUnits()])
            .then((res) => {
                if (res[0].statusCode === 200) setRoles(res[0].content || []);
                if (res[1].statusCode === 200) setOrganizationUnits(res[1].content || []);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (addNewAccess && jobs.length === 0) {
            setLoading(true);
            Promise.all([fetchJobsTree()])
                .then((res) => {
                    if (res[0].statusCode === 200) setJobs(res[0].content || []);
                })
                .finally(() => setLoading(false));
        }
    }, [addNewAccess, jobs]);

    const onSubmit = async (
        values: AccessControlFilterType,
        actions: FormikHelpers<AccessControlFilterType>
    ) => {
        setFilter(values);
        setList([]);
        const res = await accessControlFetchList({filter: values});
        actions.setSubmitting(false);
        if (res.statusCode === 200) setList(res.content || []);
    };

    const columns = useMemo(() => {
        return [
            {
                header: i18n.t('row_number'),
                enableHiding: false,
                Cell: ({row}: {row: {index: number}}) => {
                    return (
                        <Typography sx={{textAlign: 'right'}} key={'row_' + row.index}>
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
                Cell: ({row}: {row: {original: TableRow}}) => {
                    return (
                        <FormControlLabel
                            control={<Checkbox checked={row.original.status}/>}
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
                Cell: ({row}: {row: {original: TableRow}}) => {
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
                                                                return {...e, showPassword: true};
                                                            return e;
                                                        })
                                                    )
                                                }
                                            >
                                                {row.original.showPassword ? (
                                                    <Visibility/>
                                                ) : (
                                                    <VisibilityOff/>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={(event) =>
                                    setList(
                                        list.map((e) => {
                                            if (e.id === row.original.id)
                                                return {...e, newPasswrod: event.target.value};
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
    }, [list]);

    const handleFilterChange = (type: 'roles' | 'organizationUnits', itemIds: string[]) => {
        setFilter(prev => ({
            ...prev,
            [type]: itemIds
        }));
    };

    return (
        <>
            <Helmet>
                <title>{i18n.t('access_control').toString()}</title>
            </Helmet>
            <Box>
                <Grid container spacing={2} alignItems="center" mb={2}>
                    <Grid item xs>
                        <Typography variant="h3">Access Control</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setAddNewAccess(true)}
                        >
                            {i18n.t('add_new_access')}
                        </Button>
                    </Grid>
                </Grid>

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Formik
                            initialValues={filter}
                            onSubmit={onSubmit}
                            validationSchema={filterListValidationSchema}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <CustomRichTreeView
                                                label={i18n.t('roles')}
                                                items={roles}
                                                onSelectedItemsChange={(_, itemIds) =>
                                                    handleFilterChange('roles', Array.isArray(itemIds) ? itemIds : [itemIds])
                                                }
                                                multiSelect
                                                checkboxSelection
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <CustomRichTreeView
                                                label={i18n.t('organization_units')}
                                                items={organizationUnits}
                                                onSelectedItemsChange={(_, itemIds) =>
                                                    handleFilterChange('organizationUnits', Array.isArray(itemIds) ? itemIds : [itemIds])
                                                }
                                                multiSelect
                                                checkboxSelection
                                            />
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>

                        <MyCustomTable
                            data={list}
                            columns={columns}
                            enableRowActions
                            rowActions={({ row }: { row: { original: TableRow } }) => [
                                {
                                    icon: <Edit />,
                                    tooltip: i18n.t('edit'),
                                    onClick: () => setSelectedUserGrants(row.original.id)
                                }
                            ]}
                        />
                    </>
                )}

                {selectedUserGrants && (
                    <Grants
                        userId={selectedUserGrants}
                        onClose={() => setSelectedUserGrants(undefined)}
                    />
                )}

                {addNewAccess && (
                    <NewAccess
                        jobs={jobs}
                        onClose={() => {
                            setAddNewAccess(false);
                            setClearFlag(true);
                        }}
                        onSubmit={() => {
                            setAddNewAccess(false);
                            setClearFlag(true);
                        }}
                    />
                )}
            </Box>
        </>
    );
}

export default AccessControl;
