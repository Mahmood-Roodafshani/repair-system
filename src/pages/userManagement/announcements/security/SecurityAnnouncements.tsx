import { Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { i18n } from 'src/localization';
import { AnnouncementRequestType } from 'src/types/requests/userManagement/announcements/announcementRequestType';
import { validationSchema } from '../validationSchema';
import AnnouncementForm from '../AnnouncementForm';
import { Loader, OpGrid } from 'src/components';
import { sendSecurityAnnouncement } from 'src/services/userManagement/announcementService';

function SecurityAnnouncements() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (
    values: AnnouncementRequestType,
    actions: FormikHelpers<AnnouncementRequestType>
  ) => {
    setLoading(true);
    try {
      const response = await sendSecurityAnnouncement({ announcement: values });
      if ('statusCode' in response && response.statusCode === 200) {
        toast.success(i18n.t('op_done_successfully').toString());
        navigate('/user-management/announcements');
      }
    } catch (error) {
      toast.error(i18n.t('op_failed').toString());
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('security_announcement').toString()}</title>
      </Helmet>

      <Formik
        initialValues={{
          title: '',
          message: '',
          from: '',
          to: ''
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, submitForm }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AnnouncementForm
                  announcementRequest={{
                    title: '',
                    message: '',
                    from: '',
                    to: ''
                  }}
                  setAnnouncementRequest={() => {}}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12}>
                <OpGrid
                  onCreateOrEdit={submitForm}
                  createOrEditLabel={i18n.t('send')}
                  onClose={() => navigate('/user-management/announcements')}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {loading && <Loader />}
    </>
  );
}

export default SecurityAnnouncements;
