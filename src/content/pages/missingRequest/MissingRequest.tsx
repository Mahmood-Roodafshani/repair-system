import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function MissingRequest() {
  return (
    <>
      <Helmet>
        <title>درخواست مفقودی</title>
      </Helmet>
      <Grid></Grid>
    </>
  );
}

export default MissingRequest;
