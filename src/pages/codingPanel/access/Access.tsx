import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { MyCustomTable } from 'src/components';
import { Button, ButtonType, ConfirmationDialog, TextFieldFormik } from '@/components/form';
import { createCodingAccess, fetchCodingAccessList, removeCodingAccess } from 'src/services';
import { CodingAccessRequest, CodingAccessResponse } from 'src/types';
import validationSchema from './validationSchema';

interface CreateOrEditFormProps {
    onSubmit: (values: CodingAccessRequest, actions: FormikHelpers<CodingAccessRequest>) => Promise<void>;
    onCancel: () => void;
}

const CreateOrEditForm: React.FC<CreateOrEditFormProps> = ({ onSubmit, onCancel }) => {
    const { t } = useTranslation();
    const initialValues: CodingAccessRequest = {
        username: '',
        codingName: ''
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, submitForm }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextFieldFormik
                                name="username"
                                label={t('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldFormik
                                name="codingName"
                                label={t('coding_name')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                buttonType={ButtonType.SAVE}
                                onClick={submitForm}
                                disabled={isSubmitting}
                                text={t('submit')}
                            />
                            <Button
                                buttonType={ButtonType.CANCEL}
                                onClick={onCancel}
                                text={t('cancel')}
                            />
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

const Access: React.FC = () => {
    const { t } = useTranslation();
    const [accessList, setAccessList] = useState<CodingAccessResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showCreateOrEditForm, setShowCreateOrEditForm] = useState(false);
    const [selectedCodingAccessForDelete, setSelectedCodingAccessForDelete] = useState<string | number | undefined>();

    useEffect(() => {
        fetchAccessList();
    }, []);

    const fetchAccessList = async () => {
        try {
            setIsLoading(true);
            const response = await fetchCodingAccessList();
            if (response.statusCode === 200) {
                setAccessList(response.content.content);
            }
        } catch (error) {
            console.error('Error fetching access list:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (
        values: CodingAccessRequest,
        actions: FormikHelpers<CodingAccessRequest>
    ) => {
        const res = await createCodingAccess({ data: values });
        actions.setSubmitting(false);
        if ('statusCode' in res && res.statusCode === 200) {
            toast.success(t('coding_access_created').toString());
            setShowCreateOrEditForm(false);
            fetchAccessList();
        }
    };

    const handleDelete = async () => {
        if (!selectedCodingAccessForDelete) return;
        setIsLoading(true);
        try {
            const res = await removeCodingAccess({ id: selectedCodingAccessForDelete });
            if ('statusCode' in res && res.statusCode === 200) {
                setAccessList(accessList.filter((e) => e.id !== selectedCodingAccessForDelete));
                toast.success(t('coding_access_removed').toString());
            }
        } finally {
            setIsLoading(false);
            setSelectedCodingAccessForDelete(undefined);
        }
    };

    const columns = React.useMemo(
        () => [
            {
                header: t('row_number'),
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
                header: t('username'),
                accessorKey: 'username',
                size: 150
            },
            {
                header: t('coding_name'),
                accessorKey: 'codingName',
                size: 150
            }
        ],
        [t]
    );

    return (
        <>
            <Helmet>
                <title>{t('coding_access').toString()}</title>
            </Helmet>
            {isLoading && <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 9999 }}><CircularProgress /></Box>}
            {!isLoading && accessList.length > 0 && !showCreateOrEditForm && (
                <Grid>
                    <Button
                        buttonType={ButtonType.ADD}
                        showIcon={false}
                        text={t('new_coding_access').toString()}
                        sx={{ marginBottom: '20px' }}
                        onClick={() => setShowCreateOrEditForm(true)}
                    />
                    <MyCustomTable
                        enableRowActions={true}
                        columns={columns}
                        data={accessList}
                    />
                </Grid>
            )}
            {showCreateOrEditForm && (
                <CreateOrEditForm
                    onSubmit={onSubmit}
                    onCancel={() => setShowCreateOrEditForm(false)}
                />
            )}
            {selectedCodingAccessForDelete && (
                <ConfirmationDialog
                    open={true}
                    onClose={() => setSelectedCodingAccessForDelete(undefined)}
                    closeOnEsc={true}
                    dialogTitle={t('confirm_remove')}
                    dialogOkBtnAction={handleDelete}
                />
            )}
        </>
    );
};

export default Access;
