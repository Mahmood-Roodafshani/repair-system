import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@mui/material';
import {Form, Formik, FormikHelpers} from 'formik';
import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router';
import {MRT_Cell, MRT_Column, MRT_ColumnDef, MRT_Row, MRT_TableInstance} from 'material-react-table';
import {InlineLoader, Loader, MyCustomTable, OpGrid, TableRowAction} from '../../../components';
import {Degree, FamilyRelation, Gender, MaritalStatus, Religion} from '../../../constant/enums';
import {RichViewType} from '../../../types/richViewType';
import {StaffInfoRequestType} from '../../../types/requests/baseInfoPanel/staffInfo';
import {StaffInfoResponseType} from '../../../types/responses/baseInfoPanel/staffInfo';
import {i18n} from '../../../localization';
import {ConfirmationDialog} from '../../../components/form/ConfirmationDialog';
import {TextFieldFormik} from '../../../components/form/TextFieldFormik';
import {fetchCities, fetchEducationalFields} from '../../../services/common';
import {fetchFamilyInfoList, removeFamilyInfo, updateFamilyInfo} from '../../../services/baseInfoPanel';
import CreateOrEditForm from '../common/CreateOrEditForm';
import {filterValidationSchema} from '../common/validationSchema';
import {useTranslation} from "react-i18next";

interface TableRow {
    index: number;
    original: {
        id: number;
        familyRelation?: FamilyRelation;
    };
}

interface FamilyInfoItem {
    id: string;
    label: string;
}

interface ExtendedStaffInfoResponseType extends StaffInfoResponseType {
    familyInfo?: FamilyInfoItem[];
    familyRelation?: FamilyRelation;
    index: number;
}

function FamilyInfo() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const columns: MRT_ColumnDef<ExtendedStaffInfoResponseType>[] = [
        {
            accessorKey: 'index',
            header: t('common.row'),
            Cell: (props: {
                cell: MRT_Cell<ExtendedStaffInfoResponseType, unknown>;
                column: MRT_Column<ExtendedStaffInfoResponseType, unknown>;
                row: MRT_Row<ExtendedStaffInfoResponseType>;
                table: MRT_TableInstance<ExtendedStaffInfoResponseType>;
            }): string => {
                return (props.row.index + 1).toString();
            }
        },
        {
            accessorKey: 'familyRelation',
            header: t('familyInfo.relation'),
            Cell: (props: {
                cell: MRT_Cell<ExtendedStaffInfoResponseType, unknown>;
                column: MRT_Column<ExtendedStaffInfoResponseType, unknown>;
                row: MRT_Row<ExtendedStaffInfoResponseType>;
                table: MRT_TableInstance<ExtendedStaffInfoResponseType>;
            }): string => {
                const relation = props.row.original.familyRelation;
                return relation ? t(`familyInfo.relations.${relation.toLowerCase()}`) || '' : '';
            }
        }
    ];
    const [filter, setFilter] = useState<StaffInfoRequestType>();
    const [familyInfo, setFamilyInfo] = useState<ExtendedStaffInfoResponseType[]>([]);
    const [selectedMemberForEdit, setSelectedMemberForEdit] =
        useState<ExtendedStaffInfoResponseType>();
    const [selectedMemberIdForDelete, setSelectedMemberIdForDelete] = useState<
        string | number
    >();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState<RichViewType[]>([]);
    const [educationalFields, setEducationalFields] = useState<RichViewType[]>([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [richViewData, setRichViewData] = useState<RichViewType[]>([]);
    const [tableData, setTableData] = useState<TableRow[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchEducationalFields()])
            .then((res) => {
                if (res[0].statusCode === 200) setEducationalFields(res[0].content);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if ((selectedMemberForEdit || showCreateForm) && !cities) {
            setLoading(true);
            Promise.all([fetchCities()])
                .then((res) => {
                    if (res[0].statusCode === 200) setCities(res[0].content);
                })
                .finally(() => setLoading(false));
        }
    }, [selectedMemberForEdit, showCreateForm]);

    useEffect(() => {
        if (selectedMemberForEdit?.familyInfo) {
            const data = selectedMemberForEdit.familyInfo.map((info: FamilyInfoItem): RichViewType => ({
                id: info.id.toString(),
                label: info.label || ''
            }));
            setRichViewData(data);
        } else {
            setRichViewData([]);
        }
    }, [selectedMemberForEdit]);

    useEffect(() => {
        if (familyInfo) {
            const mappedData = familyInfo.map((item, index) => ({
                ...item,
                index,
            }));
            setTableData(mappedData);
        }
    }, [familyInfo]);

    const onSubmit = async (
        values: StaffInfoRequestType,
        actions: FormikHelpers<StaffInfoRequestType>
    ) => {
        setFilter(values);
        setFamilyInfo([]);
        const res = await fetchFamilyInfoList({filter: values});
        actions.setSubmitting(false);
        if (res.statusCode === 200) setFamilyInfo(res.content);
    };

    const dialogOkBtnAction = async () => {
        if (selectedMemberIdForDelete) {
            setLoading(true);
            try {
                await removeFamilyInfo({memberId: selectedMemberIdForDelete});
                setSelectedMemberIdForDelete(undefined);
                setShowDeleteDialog(false);
                await fetchData();
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (values: StaffInfoRequestType) => {
        if (!selectedMemberForEdit?.id) return;

        setLoading(true);
        try {
            await updateFamilyInfo({
                memberId: selectedMemberForEdit.id,
                memberInfo: values
            });
            await fetchData();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetchFamilyInfoList({filter: {}});
            if (response.statusCode === 200) {
                setFamilyInfo(response.content);
            }
        } finally {
            setLoading(false);
        }
    };

    const getEnumValue = <T extends Record<string, string | number>>(enumObj: T, key: string | number | boolean | undefined): T[keyof T] | undefined => {
        if (key === undefined || key === false) return undefined;
        if (typeof key === 'boolean') return undefined;
        return enumObj[key as keyof T];
    };

    return (
        <>
            <Helmet>
                <title>{i18n.t('family_info').toString()}</title>
            </Helmet>
            {!selectedMemberForEdit && !showCreateForm && (
                <Grid display={'flex'} flexDirection={'column'} gap={'20px'}>
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={{}}
                        validationSchema={filterValidationSchema}
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
                                    <Grid display={'flex'} flexDirection={'column'} gap={'10px'}>
                                        <Grid
                                            display={'flex'}
                                            flexDirection={'row'}
                                            gap={'20px'}
                                            flexWrap="wrap"
                                        >
                                            <TextFieldFormik
                                                name="firstname"
                                                label={i18n.t('firstname').toString()}
                                            />
                                            <TextFieldFormik
                                                name="lastname"
                                                label={i18n.t('lastname').toString()}
                                            />
                                            <TextFieldFormik
                                                name="fatherName"
                                                label={i18n.t('father_name').toString()}
                                            />
                                            <TextFieldFormik
                                                name="idNumber"
                                                label={i18n.t('id_number').toString()}
                                                type="number"
                                            />
                                            <TextFieldFormik
                                                name="nationalCode"
                                                label={i18n.t('national_code').toString()}
                                                type="number"
                                            />
                                            <TextFieldFormik
                                                name="supervisorNationalCode"
                                                label={i18n.t('supervisor_national_code').toString()}
                                                type="number"
                                            />
                                        </Grid>
                                    </Grid>
                                    {isSubmitting && <InlineLoader/>}
                                    {!isSubmitting && (
                                        <OpGrid
                                            onClose={() => navigate('/base-info-panel')}
                                            onCreateOrEdit={() => setShowCreateForm(true)}
                                            createOrEditLabel={i18n.t('new_family_member')}
                                            onSearch={submitForm}
                                            onClear={resetForm}
                                        />
                                    )}
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                    {familyInfo && (
                        <MyCustomTable
                            enableRowActions={true}
                            rowActions={({
                                             row
                                         }: {
                                row: { original: { id: string | number } };
                            }) => (
                                <TableRowAction
                                    onEdit={() =>
                                        setSelectedMemberForEdit(
                                            familyInfo.find((e) => e.id === row.original.id)
                                        )
                                    }
                                    onDelete={() => setSelectedMemberIdForDelete(row.original.id)}
                                />
                            )}
                            data={familyInfo}
                            columns={columns}
                        />
                    )}
                    <ConfirmationDialog
                        id="remove_modal"
                        open={selectedMemberIdForDelete !== undefined}
                        onClose={() => setSelectedMemberIdForDelete(undefined)}
                        closeOnEsc={true}
                        dialogTitle={i18n.t('confirm_remove')}
                        dialogOkBtnAction={dialogOkBtnAction}
                    />
                </Grid>
            )}
            {(selectedMemberForEdit || showCreateForm) && cities && (
                <CreateOrEditForm
                    cities={cities}
                    educationalFields={educationalFields}
                    mode={'family'}
                    initialValues={
                        showCreateForm
                            ? {}
                            : selectedMemberForEdit
                                ? {
                                    firstname: selectedMemberForEdit.name?.split(' ')[0] || '',
                                    lastname: selectedMemberForEdit.name?.split(' ')[1] || '',
                                    fatherName: selectedMemberForEdit.fatherName || '',
                                    nationalCode: selectedMemberForEdit.nationalCode || '',
                                    idNumber: selectedMemberForEdit.idNumber || '',
                                    degree: getEnumValue(Degree, selectedMemberForEdit.degree),
                                    birthLocation: selectedMemberForEdit.birthLocation || '',
                                    gender: getEnumValue(Gender, selectedMemberForEdit.gender),
                                    martialStatus: getEnumValue(MaritalStatus, selectedMemberForEdit.maritalStatus),
                                    religion: getEnumValue(Religion, selectedMemberForEdit.religion),
                                    educationalField: selectedMemberForEdit.educationalField || '',
                                    familyRelation: getEnumValue(FamilyRelation, selectedMemberForEdit.familyRelation),
                                    supervisorNationalCode: selectedMemberForEdit.supervisorNationalCode || ''
                                }
                                : {}
                    }
                    onSuccess={async () => {
                        setLoading(true);
                        setFamilyInfo([]);
                        const res = await fetchFamilyInfoList({filter: filter || {}});
                        if (res.statusCode === 200) setFamilyInfo(res.content);
                    }}
                    onClose={() => {
                        setShowCreateForm(false);
                        setSelectedMemberForEdit(undefined);
                    }}
                />
            )}
            {loading && <Loader/>}
            <Grid item xs={12}>
                <Dialog
                    open={showDeleteDialog}
                    onClose={() => setShowDeleteDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>{i18n.t('confirm_remove')?.toString()}</DialogTitle>
                    <DialogContent>
                        {i18n.t('are_you_sure_to_remove')?.toString()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDeleteDialog(false)}>
                            {i18n.t('cancel')?.toString()}
                        </Button>
                        <Button onClick={dialogOkBtnAction} color="error">
                            {i18n.t('delete')?.toString()}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </>
    );
}

export default FamilyInfo;
