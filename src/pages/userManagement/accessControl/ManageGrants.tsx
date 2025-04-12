import { TabContext } from '@mui/lab';
import { Tab, Tabs, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { i18n } from 'src/localization';

function ManageGrants() {
  const [selectedTab, setSelectedTab] = useState();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <TabContext value={selectedTab}>
        <Tabs
          onChange={(e, selectedTab) => setSelectedTab(selectedTab)}
          sx={{ marginTop: '10px' }}
          value={selectedTab}
        >
          <Tab
            sx={{ backgroundColor: theme.colors.secondary.dark }}
            value={'JOB_REPLACEMENT'}
            label={i18n.t('job_replacement').toString()}
          />
        </Tabs>
      </TabContext>
    </>
  );
}

export default ManageGrants;
