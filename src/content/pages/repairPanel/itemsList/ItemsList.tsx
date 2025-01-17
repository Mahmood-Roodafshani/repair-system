import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function ItemsList() {
  return (
    <>
      <Helmet>
        <title>لیست اقلام</title>
      </Helmet>
      <Grid></Grid>
    </>
  );
}

export default ItemsList;
