import {Grid, Typography} from '@mui/material';
import {Form, Formik, FormikHelpers} from 'formik';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {toast} from 'react-toastify';
import {MyCustomTable, TableRowAction} from 'src/components';
import {i18n} from 'src/localization';
import {Button, ButtonType, ConfirmationDialog, TextFieldFormik} from '@/components/form';
import {createCodingAccess, fetchCodingAccessList, removeCodingAccess} from 'src/services';
import {CodingAccessRequest, CodingAccessResponse, Pagination} from 'src/types';
import validationSchema from './validationSchema';
import {Box} from '@mui/material';
import {CircularProgress} from '@mui/material';

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
    const [codingAccessList, setCodingAccessList] = useState<CodingAccessResponse[]>([]);
    const [pagination] = useState<Pagination>({
        pageIndex: 0,
        pageSize: 10
    });
    const [totalCount, setTotalCount] = useState<number>(0);
    const [showCreateOrEditForm, setShowCreateOrEditForm] = useState(false);
    const [selectedCodingAccessForDelete, setSelectedCodingAccessForDelete] = useState<string | number | undefined>();

    const columns = useMemo(
        () => [
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
                header: i18n.t('username'),
                accessorKey: 'username',
                size: 150
            },
            {
                header: i18n.t('coding_name'),
                accessorKey: 'codingName',
                size: 150
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
        fetchCodingAccessList()
            .then((res) => {
                if (res.statusCode === 200) {
                    setCodingAccessList(res.content.content);
                    setTotalCount(res.content.totalCount);
                }
            });
    }, [pagination, totalCount]);

    useEffect(() => {
        setLoading(true);
        fetchCodingAccessList()
            .then((res) => {
                if (res.statusCode === 200) {
                    setCodingAccessList(res.content.content);
                    setTotalCount(res.content.totalCount);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const onSubmit = async (
        values: CodingAccessRequest,
        actions: FormikHelpers<CodingAccessRequest>
    ) => {
        const res = await createCodingAccess({ data: values });
        actions.setSubmitting(false);
        if ('statusCode' in res && res.statusCode === 200) {
            toast.success(i18n.t('coding_access_created').toString());
            setShowCreateOrEditForm(false);
            refetchData();
        }
    };

    const handleDelete = async () => {
        if (!selectedCodingAccessForDelete) return;
        setLoading(true);
        try {
            const res = await removeCodingAccess({ id: selectedCodingAccessForDelete });
            if ('statusCode' in res && res.statusCode === 200) {
                setCodingAccessList(codingAccessList.filter((e) => e.id !== selectedCodingAccessForDelete));
                toast.success(i18n.t('coding_access_removed').toString());
            }
        } finally {
            setLoading(false);
            setSelectedCodingAccessForDelete(undefined);
        }
    };

    return (
        <>
            <Helmet>
                <title>{i18n.t('coding_access').toString()}</title>
            </Helmet>
            {loading && <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 9999 }}><CircularProgress /></Box>}
            {!loading && codingAccessList.length > 0 && !showCreateOrEditForm && (
                <Grid>
                    <Button
                        buttonType={ButtonType.ADD}
                        showIcon={false}
                        text={i18n.t('new_coding_access').toString()}
                        sx={{ marginBottom: '20px' }}
                        onClick={() => setShowCreateOrEditForm(true)}
                    />
                    <MyCustomTable
                        rowActions={({
                            row
                        }: {
                            row: { original: { id: string | number } };
                        }) => (
                            <TableRowAction
                                onDelete={() => setSelectedCodingAccessForDelete(row.original.id)}
                            />
                        )}
                        enableRowActions={true}
                        columns={columns}
                        data={codingAccessList}
                    />
                </Grid>
            )}
            {showCreateOrEditForm && (
                <CreateOrEditForm
                    initialValues={{
                        username: '',
                        codingName: ''
                    }}
                    onSubmit={onSubmit}
                    onClose={() => setShowCreateOrEditForm(false)}
                />
            )}
            {selectedCodingAccessForDelete && (
                <ConfirmationDialog
                    id="remove_modal"
                    open={selectedCodingAccessForDelete !== undefined}
                    onClose={() => setSelectedCodingAccessForDelete(undefined)}
                    closeOnEsc={true}
                    dialogTitle={i18n.t('confirm_remove')}
                    dialogOkBtnAction={handleDelete}
                />
            )}
        </>
    );
}

export default Access;
