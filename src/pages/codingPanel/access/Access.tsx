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
import CreateOrEditForm from './CreateOrEditForm';

function Access() {
    const [loading, setLoading] = useState(false);
    const [codingList, setCodingList] = useState<CodingResponse[]>();
    const [codingAccessList, setCodingAccessList] = useState<
        CodingAccessResponse[]
    >([]);
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
                Cell: ({row}) => {
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
        Promise.all([
            fetchCodingAccessList({
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize
            })
        ])
            .then((res) => {
                if (res[0].statusCode === 200)
                    setCodingAccessList(res[0].content.content);
            })
            .finally(() => setRefetchingData(false));
    }, [pagination, totalCount]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetchCodingList(),
            fetchCodingAccessList({
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize
            })
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
        const res = await createCodingAccess(values);
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
            await removeCodingAccess({accessId: selectedAccess});
            setCodingAccessList(codingAccessList.filter((e) => e.id !== selectedAccess));
            setSelectedAccess(undefined);
        } catch (error) {
            console.error('Error deleting coding access:', error);
        }
    };

    const handleEdit = (access: CodingAccessResponse) => {
        setSelectedAccessForEdit(access);
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
                            name: selectedAccessForEdit.name || '',
                            id: selectedAccessForEdit.id,
                            code: selectedAccessForEdit.code || '',
                            status: selectedAccessForEdit.status
                        }}
                        onSubmit={onSubmit}
                        onClose={() => setSelectedAccessForEdit(undefined)}
                    />
                )}
            </Box>
        </>
    );
}

export default Access;
