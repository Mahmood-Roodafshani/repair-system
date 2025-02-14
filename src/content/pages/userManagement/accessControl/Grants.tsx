import { Box, Grid, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { i18n } from 'src/i18n';
import { Button, ButtonType } from 'src/mahmood-components';

function Grants({
  userId,
  onClose
}: {
  userId: string | number;
  onClose: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState<
    'HEFAZAT' | 'FARAJA' | 'JOBS' | 'ROLES' | 'GROUP_ACCESS'
  >();
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: 'HEFAZAT' | 'FARAJA' | 'JOBS' | 'ROLES' | 'GROUP_ACCESS'
  ) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab value={'HEFAZAT'} label={i18n.t('hefazat_access').toString()} />
          <Tab value={'FARAJA'} label={i18n.t('faraja_access').toString()} />
          <Tab value={'JOBS'} label={i18n.t('jobs_access').toString()} />
          <Tab value={'ROLES'} label={i18n.t('roles').toString()} />
          <Tab
            value={'GROUP_ACCESS'}
            label={i18n.t('group_access').toString()}
          />
        </Tabs>
      </Box>
      <Grid display={'flex'} flexDirection={'column'} gap={'10px'} mt={'10px'}>
        <Grid display={'flex'} flexDirection={'row'} gap={'10px'}>
          <Button
            onClick={() => console.log('')}
            buttonType={ButtonType.CREATEOREDIT}
            color="warning"
            variant="contained"
            showIcon={false}
          />
          <Button
            onClick={onClose}
            buttonType={ButtonType.CLOSE}
            color="error"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Grants;
