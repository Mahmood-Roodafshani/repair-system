import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { i18n } from 'src/localization';
import AnnouncementForm from '../AnnouncementForm';
import { useState } from 'react';
import { AnnouncementRequestType } from 'src/types/requests/userManagement/announcements/announcementRequestType';
import { Loader, OpGrid } from 'src/components';
import { Form, Formik, FormikHelpers } from 'formik';
import { sendPublicAnnouncement } from 'src/services/userManagement/announcementService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { validationSchema } from '../validationSchema';

function PublicAnnouncements() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (
    values: AnnouncementRequestType,
    actions: FormikHelpers<AnnouncementRequestType>
  ) => {
    setLoading(true);
    try {
      const response = await sendPublicAnnouncement({ announcement: values });
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
        <title>{i18n.t('public_announcement').toString()}</title>
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

export default PublicAnnouncements;
