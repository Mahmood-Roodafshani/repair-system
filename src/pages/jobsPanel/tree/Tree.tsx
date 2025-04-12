import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { CustomRichTreeView, Loader } from 'src/components';
import { i18n } from 'src/localization';
import { Button, ButtonType } from '@/components/form';
import { fetchJobsTree } from 'src/services';
import { RichViewType } from 'src/types';

function Tree() {
  const navigate = useNavigate();
  const [tree, setTree] = useState<RichViewType[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchJobsTree()])
      .then((res) => {
        if (res[0].statusCode === 200) setTree(res[0].content);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <Helmet>
        <title>{i18n.t('jobs_tree').toString()}</title>
      </Helmet>
      <Grid>
        {tree && (
          <CustomRichTreeView
            expandAllItems={true}
            items={tree}
            label={i18n.t('organization_unit')}
          />
        )}
        {loading && <Loader />}
        <Grid
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'end'}
          mt={'10px'}
        >
          <Button
            onClick={() => navigate('/jobs-panel')}
            variant="outlined"
            color="error"
            buttonType={ButtonType.CLOSE}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Tree;
