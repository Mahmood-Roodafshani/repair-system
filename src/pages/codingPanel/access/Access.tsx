import {Grid, Typography} from '@mui/material';
import {Form, Formik, FormikHelpers} from 'formik';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router';
import {toast} from 'react-toastify';
import {InlineLoader, Loader, MyCustomTable, TableRowAction} from 'src/components';
import {i18n} from 'src/localization';
import {Button, ButtonType, ConfirmationDialog, SelectFormik, TextFieldFormik} from '@/components/form';
import {createCodingAccess, fetchCodingAccessList, fetchCodingList, removeCodingAccess} from 'src/services';
import {CodingAccessRequest, CodingAccessResponse, CodingResponse, Pagination} from 'src/types';
import validationSchema from './validationSchema';
import {Box} from '@mui/material';
import {Add} from '@mui/icons-material';

interface CreateOrEditFormProps {
    initialValues: CodingAccessRequest;
    onSubmit: (values: CodingAccessRequest, actions: FormikHelpers<CodingAccessRequest>) => Promise<void>;
    onClose: () => void;
}

function CreateOrEditForm({ initialValues, onSubmit, onClose }: CreateOrEditFormProps) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, submitForm }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextFieldFormik
                                name="username"
                                label={i18n.t('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldFormik
                                name="codingName"
                                label={i18n.t('coding_name')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                buttonType={ButtonType.SAVE}
                                onClick={submitForm}
                                disabled={isSubmitting}
                            />
                            <Button
                                buttonType={ButtonType.CANCEL}
                                onClick={onClose}
                            />
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

function Access() {
    const [loading, setLoading] = useState(false);
    const [codingList, setCodingList] = useState<CodingResponse[]>([]);
    const [codingAccessList, setCodingAccessList] = useState<CodingAccessResponse[]>([]);
    const [selectedAccess, setSelectedAccess] = useState<string | number | undefined>();
    const [selectedAccessForEdit, setSelectedAccessForEdit] = useState<CodingAccessResponse | undefined>();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState<Pagination>({
        pageIndex: 0,
        pageSize: 10
    });
    const [totalCount, setTotalCount] = useState<number>(0);
    const [refetchingData, setRefetchingData] = useState(false);

    const columns = useMemo(
        () => [
            {
                header: i18n.t('row_number'),
                enableHiding: false,
                Cell: ({row}: {row: any}) => {
                    return (
                        <Typography sx={{textAlign: 'right'}} key={'row_' + row.index}>
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
        refetchData();
    }, [pagination]);

    const refetchData = useCallback(() => {
        if (totalCount === 0) return;
        setCodingAccessList([]);
        setRefetchingData(true);
        fetchCodingAccessList()
            .then((res) => {
                if (res.statusCode === 200) {
                    setCodingAccessList(res.content.content);
                    setTotalCount(res.content.totalCount);
                }
            })
            .finally(() => setRefetchingData(false));
    }, [pagination, totalCount]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetchCodingList(),
            fetchCodingAccessList()
        ])
            .then((res) => {
                if (res[0].statusCode === 200) setCodingList(res[0].content);
                if (res[1].statusCode === 200) {
                    setCodingAccessList(res[1].content.content);
                    setTotalCount(res[1].content.totalCount);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const onSubmit = async (
        values: CodingAccessRequest,
        actions: FormikHelpers<CodingAccessRequest>
    ) => {
        const res = await createCodingAccess({
            data: values
        });
        actions.setSubmitting(false);
        if (res.statusCode === 200) {
            toast(i18n.t('new_access_created').toString(), {type: 'success'});
            actions.resetForm();
            refetchData();
        }
    };

    const handleDelete = async () => {
        if (!selectedAccess) return;
        try {
            await removeCodingAccess({id: selectedAccess});
            setCodingAccessList(codingAccessList.filter((e) => e.id !== selectedAccess));
            setSelectedAccess(undefined);
        } catch (error) {
            console.error('Error deleting coding access:', error);
        }
    };

    return (
        <>
            <Helmet>
                <title>{i18n.t('coding_access').toString()}</title>
            </Helmet>
            <Box>
                <Grid container spacing={2} alignItems="center" mb={2}>
                    <Grid item xs>
                        <Typography variant="h3">Coding Access</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setSelectedAccessForEdit({} as CodingAccessResponse)}
                            buttonType={ButtonType.ADD}
                        >
                            {i18n.t('add_new_access')}
                        </Button>
                    </Grid>
                </Grid>

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <MyCustomTable
                            rowCount={totalCount}
                            pagination={pagination}
                            onPaginationChange={setPagination}
                            enablePagination={true}
                            enableRowActions={true}
                            isRefetching={refetchingData}
                            rowActions={({
                                row
                            }: {
                                row: { original: { id: string | number } };
                            }) => (
                                <TableRowAction
                                    onDelete={() => setSelectedAccess(row.original.id)}
                                />
                            )}
                            columns={columns}
                            data={codingAccessList}
                        />
                    </>
                )}

                {selectedAccessForEdit && (
                    <CreateOrEditForm
                        initialValues={{
                            username: selectedAccessForEdit.username || '',
                            codingName: selectedAccessForEdit.codingName || ''
                        }}
                        onSubmit={onSubmit}
                        onClose={() => setSelectedAccessForEdit(undefined)}
                    />
                )}

                <ConfirmationDialog
                    open={!!selectedAccess}
                    onClose={() => setSelectedAccess(undefined)}
                    onConfirm={handleDelete}
                    title={i18n.t('delete_access')}
                    description={i18n.t('delete_access_confirm')}
                />
            </Box>
        </>
    );
}

export default Access;
