import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { i18n } from 'src/i18n';
import AnnouncementForm from '../AnnouncementForm';
import { useState } from 'react';
import { AnnouncementRequestType } from 'src/types';
import { Loader, OpGrid } from 'src/components';
import { Form, Formik, FormikHelpers } from 'formik';
import { sendPublicAnnouncement } from 'src/service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { validationSchema } from '../validationSchema';

function PublicAnnouncements() {
  const [showForm, setShowForm] = useState(true);

  const onSubmit = async (
    values: AnnouncementRequestType,
    actions: FormikHelpers<AnnouncementRequestType>
  ) => {
    const res = await sendPublicAnnouncement({ request: values });
    actions.setSubmitting(false);
    if (res.statusCode === 200) {
      toast(i18n.t('op_done_successfully').toString(), { type: 'success' });
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{i18n.t('public_announcement').toString()}</title>
      </Helmet>

      <Formik
        onSubmit={onSubmit}
        initialValues={{}}
        validationSchema={validationSchema}
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
            <Grid
              mr={'50px'}
              ml={'50px'}
              display={'flex'}
              flexDirection={'column'}
              gap={'10px'}
            >
              {showForm && (
                <AnnouncementForm
                  announcementRequest={values}
                  setAnnouncementRequest={setValues}
                  errors={errors}
                />
              )}
              {isSubmitting && <Loader />}
              {!isSubmitting && (
                <OpGrid
                  onClear={() => {
                    setShowForm(false);
                    resetForm(undefined);
                    setTimeout(() => {
                      setShowForm(true);
                    }, 200);
                  }}
                  onCreateOrEdit={submitForm}
                  onClose={() => navigate('usermanagement')}
                />
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default PublicAnnouncements;
