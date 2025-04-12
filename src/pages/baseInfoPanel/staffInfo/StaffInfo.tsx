import {Grid, Typography} from '@mui/material';
import {Form, Formik, FormikHelpers} from 'formik';
import {useEffect, useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router';
import {toast} from 'react-toastify';
import DateObject from 'react-date-object';
import {
    CustomDatePicker,
    CustomRichTreeView,
    InlineLoader,
    Loader,
    MyCustomTable,
    OpGrid,
    TableRowAction
} from 'src/components';
import {Degree, Gender, MaritalStatus, Religion, ServiceStatus} from 'src/constant/enums';
import {i18n} from 'src/localization';
import {ConfirmationDialog, SelectFormik, TextFieldFormik} from 'src/components/form';
import {
    fetchStaffInfoList,
    removeStaff
} from 'src/services/baseInfoPanel';
import {
    fetchCities,
    fetchEducationalFields,
    fetchPositionDegree,
    fetchWorkLocations
} from 'src/services/common';
import {RichViewType, StaffInfoRequestType, StaffInfoResponseType} from 'src/types';
import CreateOrEditForm from '../common/CreateOrEditForm';
import {filterValidationSchema} from '../common/validationSchema';

interface FormValues extends Omit<StaffInfoRequestType, 'hireDate'> {
    firstname?: string;
    lastname?: string;
    fatherName?: string;
    idNumber?: string;
    nationalCode?: string;
    staffCode?: string;
    hireDate?: string | Date | DateObject;
    positionDegree?: string;
    martialStatus?: string;
    degree?: string;
    serviceStatus?: string;
    workLocation?: string;
    educationalField?: string;
}

interface TableRow {
    index: number;
    original: {
        id: string | number;
        degree: keyof typeof Degree;
        familyRelation?: string;
    };
}

const MaritalStatusOptions = Object.keys(MaritalStatus).map(key => ({
    id: MaritalStatus[key as keyof typeof MaritalStatus],
    label: i18n.t(key.toLowerCase())
}));

const DegreeOptions = Object.keys(Degree).map(key => ({
    id: Degree[key as keyof typeof Degree],
    label: i18n.t(key.toLowerCase())
}));

const ServiceStatusOptions = Object.keys(ServiceStatus).map(key => ({
    id: ServiceStatus[key as keyof typeof ServiceStatus],
    label: i18n.t(key.toLowerCase())
}));

function StaffInfo() {
    const [cities, setCities] = useState<RichViewType[]>([]);
    const [educationalFields, setEducationalFields] = useState<RichViewType[]>([]);
    const [workLocations, setWorkLocations] = useState<RichViewType[]>([]);
    const [positionDegrees, setPositionDegrees] = useState<RichViewType[]>([]);

    const [filter, setFilter] = useState<StaffInfoRequestType>({});
    const [staffInfo, setStaffInfo] = useState<StaffInfoResponseType[]>([]);
    const [selectedStaffForEdit, setSelectedStaffForEdit] = useState<StaffInfoResponseType | null>(null);
    const [selectedStaffIdForDelete, setSelectedStaffIdForDelete] = useState<string | number | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if ((selectedStaffForEdit || showCreateForm) && !cities) {
            setLoading(true);
            Promise.all([fetchCities()])
                .then((res) => {
                    if (res[0].statusCode === 200) setCities(res[0].content);
                })
                .finally(() => setLoading(false));
        }
    }, [selectedStaffForEdit, showCreateForm]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetchPositionDegree(),
            fetchEducationalFields(),
            fetchWorkLocations()
        ])
            .then((res) => {
                if (res[0].statusCode === 200) setPositionDegrees(res[0].content);
                if (res[1].statusCode === 200) setEducationalFields(res[1].content);
                if (res[2].statusCode === 200) setWorkLocations(res[2].content);
            })
            .finally(() => setLoading(false));
    }, []);

    const onSubmit = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        const requestValues: StaffInfoRequestType = {
            ...values,
            hireDate: values.hireDate
        };
        setFilter(requestValues);
        setStaffInfo([]);
        const res = await fetchStaffInfoList({filter: requestValues});
        actions.setSubmitting(false);
        if (res.statusCode === 200) setStaffInfo(res.content);
    };

    const navigate = useNavigate();
    const columns = useMemo(
        () => [
            {
                header: i18n.t('row_number'),
                enableHiding: false,
                Cell: ({row}: {row: TableRow}) => {
                    return (
                        <Typography sx={{textAlign: 'right'}} key={'row_' + row.index}>
                            {row.index + 1}
                        </Typography>
                    );
                },
                size: 40
            },
            {
                header: i18n.t('name'),
                accessorKey: 'name',
                size: 150
            },
            {
                header: i18n.t('father_name'),
                accessorKey: 'fatherName',
                size: 100
            },
            {
                header: i18n.t('national_code'),
                accessorKey: 'nationalCode',
                size: 120
            },
            {
                header: i18n.t('id_number'),
                accessorKey: 'idNumber',
                size: 120
            },
            {
                header: i18n.t('staff_code'),
                accessorKey: 'staffCode',
                size: 120
            },
            {
                header: i18n.t('work_location'),
                accessorKey: 'workLocation'
            },
            {
                header: i18n.t('degree'),
                accessorFn: (row: TableRow['original']) => i18n.t(row.degree.toString().toLowerCase()),
                size: 120
            }
        ],
        []
    );

    const getDateValue = (value: string | Date | DateObject | undefined): string | Date | DateObject => {
        if (!value) return '';
        return value;
    };

    return (
        <>
            <Helmet>
                <title>{i18n.t('staffInfo').toString()}</title>
            </Helmet>
            {!selectedStaffForEdit && !showCreateForm && (
                <Grid display={'flex'} flexDirection={'column'} gap={'20px'}>
                    <Formik<FormValues>
                        onSubmit={onSubmit}
                        initialValues={{
                            hireDate: ''
                        }}
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
                                                name="staffCode"
                                                label={i18n.t('staff_code').toString()}
                                                type="number"
                                            />
                                            <CustomDatePicker
                                                label={i18n.t('hire_date')}
                                                value={getDateValue(values.hireDate)}
                                                onChange={(e) => {
                                                    setValues((prevValues) => ({
                                                        ...prevValues,
                                                        hireDate: e
                                                    }));
                                                }}
                                                error={errors.hireDate}
                                            />
                                            {positionDegrees && (
                                                <SelectFormik
                                                    options={positionDegrees}
                                                    name="positionDegree"
                                                    label={i18n.t('position_degree').toString()}
                                                />
                                            )}
                                            <SelectFormik
                                                options={MaritalStatusOptions}
                                                name="martialStatus"
                                                label={i18n.t('martial_status').toString()}
                                            />
                                            <SelectFormik
                                                options={DegreeOptions}
                                                name="degree"
                                                label={i18n.t('degree').toString()}
                                            />
                                            <SelectFormik
                                                options={ServiceStatusOptions}
                                                name="serviceStatus"
                                                label={i18n.t('service_status').toString()}
                                            />
                                        </Grid>
                                        <Grid display={'flex'} flexDirection={'row'} gap={'20px'}>
                                            {workLocations && (
                                                <CustomRichTreeView
                                                    sx={{
                                                        width: '330px'
                                                    }}
                                                    label={i18n.t('work_location')}
                                                    items={workLocations.map((e) => ({
                                                        id: 'work_location_' + e.id,
                                                        label: e.label,
                                                        children: e.children
                                                    }))}
                                                    onSelectedItemsChange={(_, itemIds) =>
                                                        setValues((prevValues) => ({
                                                            ...prevValues,
                                                            workLocation: itemIds[0]
                                                        }))
                                                    }
                                                    error={errors.workLocation}
                                                />
                                            )}
                                            {educationalFields && (
                                                <CustomRichTreeView
                                                    label={i18n.t('educational_field')}
                                                    sx={{
                                                        width: '330px'
                                                    }}
                                                    items={educationalFields.map((e) => ({
                                                        id: 'educational_fields_' + e.id,
                                                        label: e.label,
                                                        children: e.children
                                                    }))}
                                                    onSelectedItemsChange={(_, itemIds) =>
                                                        setValues((prevValues) => ({
                                                            ...prevValues,
                                                            educationalField: itemIds[0]
                                                        }))
                                                    }
                                                    error={errors.educationalField}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                    {isSubmitting && <InlineLoader/>}
                                    {!isSubmitting && (
                                        <OpGrid
                                            onClose={() => navigate('/base-info-panel')}
                                            onCreateOrEdit={() => setShowCreateForm(true)}
                                            createOrEditLabel={i18n.t('new_staff')}
                                            onSearch={submitForm}
                                            onClear={resetForm}
                                        />
                                    )}
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                    {staffInfo && staffInfo.length > 0 && (
                        <MyCustomTable
                            enableRowActions={true}
                            rowActions={({row}: {row: TableRow}) => (
                                <TableRowAction
                                    onEdit={() =>
                                        setSelectedStaffForEdit(
                                            staffInfo.find((e) => e.id === row.original.id) || null
                                        )
                                    }
                                    onDelete={() => setSelectedStaffIdForDelete(row.original.id)}
                                />
                            )}
                            data={staffInfo}
                            columns={columns}
                        />
                    )}
                    <ConfirmationDialog
                        id="remove_modal"
                        open={selectedStaffIdForDelete !== null}
                        onClose={() => setSelectedStaffIdForDelete(null)}
                        closeOnEsc={true}
                        dialogTitle={i18n.t('confirm_remove')}
                        dialogOkBtnAction={() => {
                            if (selectedStaffIdForDelete !== null) {
                                setLoading(true);
                                removeStaff({staffId: selectedStaffIdForDelete})
                                    .then((res) => {
                                        if (res.statusCode === 200 && staffInfo) {
                                            setStaffInfo(
                                                staffInfo.filter((e) => e.id !== selectedStaffIdForDelete)
                                            );
                                            toast.success(i18n.t('user_removed').toString());
                                        }
                                    })
                                    .finally(() => setLoading(false));
                            }
                        }}
                    />
                </Grid>
            )}
            {(selectedStaffForEdit || showCreateForm) && cities && (
                <CreateOrEditForm
                    mode="staff"
                    cities={cities}
                    initialValues={
                        showCreateForm
                            ? {}
                            : selectedStaffForEdit
                            ? {
                                firstname: selectedStaffForEdit.name.split(' ')[0],
                                lastname: selectedStaffForEdit.name.split(' ')[1],
                                fatherName: selectedStaffForEdit.fatherName,
                                nationalCode: selectedStaffForEdit.nationalCode,
                                staffCode: selectedStaffForEdit.staffCode,
                                idNumber: selectedStaffForEdit.idNumber,
                                address: selectedStaffForEdit.address,
                                mobile: selectedStaffForEdit.mobile,
                                degree: selectedStaffForEdit.degree ? Degree[selectedStaffForEdit.degree as keyof typeof Degree] : undefined,
                                birthLocation: selectedStaffForEdit.birthLocation,
                                serviceStatus: selectedStaffForEdit.serviceStatus ? ServiceStatus[selectedStaffForEdit.serviceStatus as keyof typeof ServiceStatus] : undefined,
                                gender: selectedStaffForEdit.gender ? Gender[selectedStaffForEdit.gender as keyof typeof Gender] : undefined,
                                positionDegree: selectedStaffForEdit.positionDegree,
                                martialStatus: selectedStaffForEdit.maritalStatus ? MaritalStatus[selectedStaffForEdit.maritalStatus as keyof typeof MaritalStatus] : undefined,
                                religion: selectedStaffForEdit.religion ? Religion[selectedStaffForEdit.religion as keyof typeof Religion] : undefined,
                                hireDate: selectedStaffForEdit.hireDate,
                                educationalField: selectedStaffForEdit.educationalField
                            }
                            : {}
                    }
                    positionDegrees={positionDegrees}
                    workLocations={workLocations}
                    educationalFields={educationalFields}
                    onSuccess={async () => {
                        setStaffInfo([]);
                        if (filter) {
                            const res = await fetchStaffInfoList({filter});
                            setLoading(false);
                            if (res.statusCode === 200) setStaffInfo(res.content);
                        }
                    }}
                    onClose={() => {
                        setShowCreateForm(false);
                        setSelectedStaffForEdit(null);
                    }}
                />
            )}
            {loading && <Loader/>}
        </>
    );
}

export default StaffInfo;
