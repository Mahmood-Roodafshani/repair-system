import { Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  CustomRichTreeView,
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid,
  TableRowAction
} from 'src/components';
import { JobLevel, JobStatus } from 'src/constant';
import { i18n } from 'src/localization';
import { ConfirmationDialog } from '@/components/form';
import {
  fetchJobsList,
  removeJob
} from 'src/services';
import CommonService from 'src/services/CommonService';
import { JobResponseType, RichViewType } from 'src/types';
import CreateOrEditForm from './CreateOrEditForm';

type FormFilter = {
  organizationUnits?: string[];
};

interface TableRow {
  index: number;
  original: JobResponseType;
}

function List() {
  const [jobs, setJobs] = useState<JobResponseType[]>([]);
  const [selectedJobForEdit, setSelectedJobForEdit] = useState<JobResponseType>();
  const [selectedJobIdForDelete, setSelectedJobIdForDelete] = useState<string | number>();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [organizationUnits, setOrganizationUnits] = useState<RichViewType[]>([]);
  const [fields, setFields] = useState<RichViewType[]>([]);
  const [courses, setCourses] = useState<RichViewType[]>([]);
  const [positionDegrees, setPositionDegrees] = useState<RichViewType[]>([]);
  const [selectedOrganizationUnits, setSelectedOrganizationUnits] = useState<string[]>([]);

  const columns = useMemo(
    () => [
      {
        header: i18n.t('row_number'),
        enableHiding: false,
        Cell: ({ row }: { row: TableRow }) => {
          return (
            <Typography sx={{ textAlign: 'right' }} key={'row_' + row.index}>
              {row.index + 1}
            </Typography>
          );
        },
        size: 40
      },
      {
        header: i18n.t('job_title'),
        accessorKey: 'title',
        size: 150
      },
      {
        header: i18n.t('organization_unit'),
        accessorKey: 'organizationUnit',
        size: 100
      },
      {
        header: i18n.t('job_level'),
        accessorFn: (row: JobResponseType) =>
          row.jobLevel
            ? i18n.t('job_level_' + row.jobLevel.toString().toLowerCase())
            : '',
        size: 120
      },
      {
        header: i18n.t('status'),
        accessorFn: (row: JobResponseType) =>
          row.jobStatus ? i18n.t(row.jobStatus.toString().toLowerCase()) : '',
        size: 120
      }
    ],
    []
  );

  useEffect(() => {
    if ((selectedJobForEdit || showCreateForm) && fields.length === 0) {
      setLoading(true);
      Promise.all([CommonService.getFields(), CommonService.getCourses(), CommonService.getPositionDegrees()])
        .then(([fieldsRes, coursesRes, positionDegreesRes]) => {
          setFields(fieldsRes);
          setCourses(coursesRes);
          setPositionDegrees(positionDegreesRes);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedJobForEdit, showCreateForm, fields]);

  useEffect(() => {
    setLoading(true);
    CommonService.getOrganizationUnits()
      .then((res) => {
        setOrganizationUnits(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (
    values: FormFilter,
    actions: FormikHelpers<FormFilter>
  ) => {
    setJobs([]);
    setSelectedOrganizationUnits(values.organizationUnits || []);
    const res = await fetchJobsList({
      organizationUnit:
        values.organizationUnits && values.organizationUnits.length > 0
          ? values.organizationUnits[0]
          : undefined
    });
    actions.setSubmitting(false);
    if (res.statusCode === 200) setJobs(res.content);
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('create_jobs').toString()}</title>
      </Helmet>
      {!selectedJobForEdit && !showCreateForm && (
        <Grid display={'flex'} flexDirection={'column'} gap={'20px'}>
          <Formik
            onSubmit={onSubmit}
            initialValues={{ organizationUnit: undefined }}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
          >
            {({ setValues, isSubmitting, submitForm, resetForm }) => (
              <Form>
                <Grid display={'flex'} flexDirection={'column'} gap={'30px'}>
                  {organizationUnits.length > 0 && (
                    <CustomRichTreeView
                      onSelectedItemsChange={(_, itemIds) =>
                        setValues((prevValues) => ({
                          ...prevValues,
                          organizationUnit: itemIds[0]
                        }))
                      }
                      label={i18n.t('organization_unit')}
                      items={organizationUnits}
                      sx={{ width: '500px' }}
                    />
                  )}

                  {isSubmitting && <InlineLoader />}
                  {!isSubmitting && (
                    <OpGrid
                      onClose={() => navigate('/jobs-panel')}
                      onCreateOrEdit={() => setShowCreateForm(true)}
                      createOrEditLabel={i18n.t('new_job')}
                      onSearch={submitForm}
                      onClear={resetForm}
                    />
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
          {jobs.length > 0 && (
            <MyCustomTable
              enableRowActions={true}
              rowActions={({
                row
              }: {
                row: { original: { id: string | number } };
              }) => (
                <TableRowAction
                  onEdit={() =>
                    setSelectedJobForEdit(
                      jobs.find((e) => e.id === row.original.id)
                    )
                  }
                  onDelete={() => setSelectedJobIdForDelete(row.original.id)}
                />
              )}
              data={jobs}
              columns={columns}
            />
          )}
          <ConfirmationDialog
            id="remove_modal"
            open={selectedJobIdForDelete !== undefined}
            onClose={() => setSelectedJobIdForDelete(undefined)}
            closeOnEsc={true}
            dialogTitle={i18n.t('confirm_remove')}
            dialogOkBtnAction={() => {
              if (!selectedJobIdForDelete) return;
              setLoading(true);
              removeJob({ id: selectedJobIdForDelete })
                .then((res) => {
                  if (res.statusCode === 200) {
                    setJobs(
                      jobs.filter((e) => e.id !== selectedJobIdForDelete)
                    );
                    toast.success(i18n.t('job_removed').toString());
                  }
                })
                .finally(() => setLoading(false));
            }}
          />
        </Grid>
      )}

      {(selectedJobForEdit || showCreateForm) &&
        fields.length > 0 &&
        courses.length > 0 &&
        positionDegrees.length > 0 && (
          <CreateOrEditForm
            initialValues={
              showCreateForm
                ? {}
                : selectedJobForEdit
                ? {
                    title: selectedJobForEdit.title,
                    id: selectedJobForEdit.id,
                    jobStatus: selectedJobForEdit.jobStatus as JobStatus,
                    jobLevel: selectedJobForEdit.jobLevel as JobLevel,
                    jobDescription: selectedJobForEdit.jobDescription,
                    responsibilityDescription:
                      selectedJobForEdit.responsibilityDescription,
                    code: selectedJobForEdit.code,
                    positionDegree: selectedJobForEdit.positionDegree,
                    neededCourses: selectedJobForEdit.neededCourses,
                    neededFields: selectedJobForEdit.neededFields,
                    organizationUnit: selectedJobForEdit.organizationUnit
                  }
                : {}
            }
            organizationUnits={organizationUnits}
            positionDegrees={positionDegrees}
            fields={fields}
            courses={courses}
            onSuccess={async () => {
              setLoading(true);
              const res = await fetchJobsList({
                organizationUnit:
                  selectedOrganizationUnits.length > 0
                    ? selectedOrganizationUnits[0]
                    : undefined
              });
              setLoading(false);
              if (res.statusCode === 200) setJobs(res.content);
            }}
            onClose={() => {
              setSelectedJobForEdit(undefined);
              setShowCreateForm(false);
            }}
          />
        )}
      {loading && <Loader />}
    </>
  );
}

export default List;
