import { Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { i18n } from 'src/localization';
import { AnnouncementRequestType } from 'src/types';
import { validationSchema } from '../validationSchema';
import AnnouncementForm from '../AnnouncementForm';
import { Loader, OpGrid } from 'src/components';
import { sendSecurityAnnouncement } from 'src/services/userManagement/announcementService';
import { AxiosResponse } from 'axios';

type MockResponse = {
  statusCode: number;
};

function isMockResponse(response: any): response is MockResponse {
  return 'statusCode' in response;
}

function isAxiosResponse(response: any): response is AxiosResponse {
  return 'status' in response;
}

function SecurityAnnouncements() {
  const [showForm, setShowForm] = useState(true);

  const onSubmit = async (
    values: AnnouncementRequestType,
    actions: FormikHelpers<AnnouncementRequestType>
  ) => {
    const response = await sendSecurityAnnouncement({ request: values });
    actions.setSubmitting(false);
    if ((isMockResponse(response) && response.statusCode === 200) || 
        (isAxiosResponse(response) && response.status === 200)) {
      toast(i18n.t('op_done_successfully').toString(), { type: 'success' });
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{i18n.t('security_announcement').toString()}</title>
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

export default SecurityAnnouncements;
