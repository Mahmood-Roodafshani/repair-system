import { Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import {
  CustomRichTreeView,
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid
} from 'src/components';
import { i18n } from 'src/i18n';
import { JobLevel, JobStatus } from 'src/constants';
import {
  fetchCourses,
  fetchFields,
  fetchJobsList,
  fetchOrganizationUnits,
  fetchPositionDegree,
  removeJob
} from 'src/service';
import { JobResponseType, RichViewType } from 'src/types';
import CreateOrEditForm from './CreateOrEditForm';
import { ConfirmationDialog } from 'src/mahmood-components';
import { toast } from 'react-toastify';

type FormFilter = {
  organizationUnits?: string[];
};

function List() {
  const [jobs, setJobs] = useState<JobResponseType[]>();
  const [selectedJobForEdit, setSelectedJobForEdit] =
    useState<JobResponseType>();
  const [selectedJobIdForDelete, setSelectedJobIdForDelete] = useState<
    string | number
  >();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [organizationUnits, setOrganizationUnits] = useState<RichViewType[]>();
  const [fields, setFields] = useState();
  const [courses, setCourses] = useState();
  const [positionDegrees, setPositionDegrees] = useState();
  const [selectedOrganizationUnits, setSelectedOrganizationUnits] =
    useState<string[]>();
  const columns = useMemo(
    () => [
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
        accessorFn: (row) =>
          row.jobLevel
            ? i18n.t('job_level_' + row.jobLevel.toString().toLowerCase())
            : '',
        size: 120
      },
      {
        header: i18n.t('status'),
        accessorFn: (row) =>
          row.jobStatus ? i18n.t(row.jobStatus.toString().toLowerCase()) : '',
        size: 120
      }
    ],
    []
  );

  useEffect(() => {
    if ((selectedJobForEdit || showCreateForm) && !fields) {
      setLoading(true);
      Promise.all([fetchFields(), fetchCourses(), fetchPositionDegree()])
        .then((res) => {
          if (res[0].statusCode === 200) setFields(res[0].content);
          if (res[1].statusCode === 200) setCourses(res[1].content);
          if (res[2].statusCode === 200) setPositionDegrees(res[2].content);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedJobForEdit, showCreateForm]);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchOrganizationUnits()])
      .then((res) => {
        if (res[0].statusCode === 200) setOrganizationUnits(res[0].content);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (
    values: FormFilter,
    actions: FormikHelpers<FormFilter>
  ) => {
    setJobs([]);
    setSelectedOrganizationUnits(values.organizationUnits);
    // todo: pass correct filter
    const res = await fetchJobsList({
      organizationUnit:
        values.organizationUnits?.length > 0
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
                  {organizationUnits && (
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
          {jobs && (
            <MyCustomTable
              enableRowActions={true}
              rowActions={({
                row
              }: {
                row: { original: { id: string | number } };
              }) => (
                <Grid display={'flex'} flex={'row'} gap={'10px'}>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setSelectedJobForEdit(
                        jobs.find((e) => e.id === row.original.id)
                      );
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setSelectedJobIdForDelete(row.original.id)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
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
              setLoading(true);
              removeJob({ jobId: selectedJobIdForDelete })
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
        fields &&
        courses &&
        positionDegrees && (
          <CreateOrEditForm
            initialValues={
              showCreateForm
                ? {}
                : {
                    title: selectedJobForEdit.title,
                    id: selectedJobForEdit.id,
                    jobStatus: JobStatus[selectedJobForEdit.jobStatus],
                    jobLevel: JobLevel[selectedJobForEdit.jobLevel],
                    jobDescription: selectedJobForEdit.jobDescription,
                    responsibilityDescription:
                      selectedJobForEdit.responsibilityDescription,
                    code: selectedJobForEdit.code,
                    positionDegree: selectedJobForEdit.positionDegree,
                    neededCourses: selectedJobForEdit.neededCourses,
                    neededFields: selectedJobForEdit.neededFields,
                    organizationUnit: selectedJobForEdit.organizationUnit
                  }
            }
            organizationUnits={organizationUnits}
            onSuccess={async () => {
              setLoading(true);
              const res = await fetchJobsList({
                organizationUnit:
                  selectedOrganizationUnits?.length > 0
                    ? selectedOrganizationUnits[0]
                    : undefined
              });
              setLoading(false);
              if (res.statusCode === 200) setJobs(res.content);
            }}
            positionDegrees={positionDegrees}
            fields={fields}
            courses={courses}
            onClose={() => {
              setShowCreateForm(false);
              setSelectedJobForEdit(undefined);
            }}
          />
        )}
      {loading && <Loader />}
    </>
  );
}

export default List;
