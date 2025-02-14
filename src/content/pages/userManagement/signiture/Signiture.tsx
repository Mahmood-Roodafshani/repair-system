import { CameraAltTwoTone } from '@mui/icons-material';
import { Button, Dialog, DialogTitle, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DropzoneArea } from 'react-mui-dropzone';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Loader, OpGrid } from 'src/components';
import { i18n } from 'src/i18n';
import { addSampleSigniture } from 'src/service';
import { SampleSignitureRequestType } from 'src/types';

function Signiture() {
  const [signiture, setSigniture] = useState<SampleSignitureRequestType>();
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addDigitalSigniture, setAddDigitalSigniture] = useState(false);

  return (
    <>
      <Helmet>
        <title>{i18n.t('signiture_sample').toString()}</title>
      </Helmet>
      {showForm && (
        <Grid display={'flex'} flexDirection={'column'} gap={'10px'}>
          <TextField
            sx={{ width: '400px' }}
            onChange={(event) =>
              setSigniture((prevValues) => ({
                ...prevValues,
                staffCode: event.target.value
              }))
            }
            type="number"
            label={i18n.t('requester').toString()}
          />
          <Grid width={'400px'}>
            <DropzoneArea
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              dropzoneText={i18n.t('signiture_sample_file')}
              dropzoneClass={'cusorm-dropzone-container'}
              clearOnUnmount={true}
              Icon={CameraAltTwoTone}
              filesLimit={1}
              maxFileSize={5000000}
              onChange={(e) =>
                setSigniture((prevValues) => ({
                  ...prevValues,
                  file: e[0]
                }))
              }
            />
          </Grid>
        </Grid>
      )}
      {loading && <Loader />}
      {!loading && (
        <OpGrid
          sx={{ marginTop: '10px' }}
          onClear={() => {
            setShowForm(false);
            setSigniture(undefined);
            setTimeout(() => {
              setShowForm(true);
            }, 200);
          }}
          onCreateOrEdit={async () => {
            if (
              signiture.staffCode === undefined ||
              (signiture.file === undefined &&
                signiture.digitalSigniture === undefined)
            ) {
              toast(i18n.t('please_fill_req_fields').toString(), {
                type: 'error'
              });
              return;
            }
            setLoading(true);
            const res = await addSampleSigniture({
              sampleSigniture: signiture
            });
            setLoading(false);
            if (res.statusCode === 201) {
              toast(i18n.t('op_done_successfully').toString(), {
                type: 'success'
              });
              setShowForm(false);
              setSigniture(undefined);
              setTimeout(() => {
                setShowForm(true);
              }, 200);
            }
          }}
          onClose={() => navigate('/usermanagement')}
          additionalBtn={
            <Button
              onClick={() => setAddDigitalSigniture(true)}
              variant="contained"
              color="success"
            >
              {i18n.t('digital_signiture').toString()}
            </Button>
          }
        />
      )}
      <Dialog
        sx={{ margin: '0 auto' }}
        onClose={() => setAddDigitalSigniture(false)}
        open={addDigitalSigniture}
      >
        <DialogTitle>{i18n.t('digital_signiture').toString()}</DialogTitle>
        <TextField
          onChange={(e) =>
            setSigniture((prevValues) => ({
              ...prevValues,
              digitalSigniture: e.target.value
            }))
          }
          multiline={true}
          maxRows={10}
          minRows={10}
        />
        <Grid display={'flex'} flexDirection={'row'} gap={'10px'} mt={'10px'}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setSigniture((prevValues) => ({
                ...prevValues,
                digitalSigniture: undefined
              }));
              setAddDigitalSigniture(false);
            }}
          >
            {i18n.t('cancel').toString()}
          </Button>
          <Button
            loading={loading}
            variant="contained"
            color="success"
            onClick={() => {
              if (signiture.digitalSigniture === undefined) {
                toast(i18n.t('please_fill_req_fields').toString(), {
                  type: 'error'
                });
                return;
              }
              setAddDigitalSigniture(false);
            }}
          >
            {i18n.t('ok').toString()}
          </Button>
        </Grid>
      </Dialog>
    </>
  );
}

export default Signiture;
