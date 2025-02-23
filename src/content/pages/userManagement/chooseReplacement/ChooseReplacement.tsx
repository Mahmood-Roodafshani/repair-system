import {
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import DatePicker from 'react-multi-date-picker';
import { i18n } from 'src/i18n';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useEffect, useMemo, useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import { Loader, MyCustomTable, OpGrid } from 'src/components';
import { useNavigate } from 'react-router';
import { TakenGrants } from './takenGrants';
import { grantsMock, jobsMock } from 'src/mock';
import { RichTreeView } from '@mui/x-tree-view';
import { extractIds } from 'src/utils/helper';
import { Button, ButtonType } from 'src/mahmood-components';
import { Delete } from '@mui/icons-material';

function ChooseReplacement() {
  const [formData, setFormData] = useState<any>({
    from: undefined,
    to: undefined
  });
  const [selectedTab, setSelectedTab] = useState<
    'JOB_REPLACEMENT' | 'ROLE_REPLACEMENT'
  >('JOB_REPLACEMENT');
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [takenJobsGrants, setTakenJobsGrants] = useState<any[]>([
    { name: 'سازمانی' }
  ]);
  const [takenGrants, setTakenGrants] = useState<TakenGrants[]>([]);
  const [replacementJobs, setReplacementJobs] = useState<any[]>(jobsMock);
  const [replacementGrants, setReplacementGrants] = useState<any[]>(grantsMock);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  useEffect(() => {
    setExpandedIds(extractIds(replacementJobs));
  }, [replacementJobs]);

  const [rolesColumns, jobsColumns] = useMemo(() => {
    return [
      [
        {
          header: i18n.t('job_replacement'),
          accessorKey: 'job_replacement',
          size: 300
        },
        {
          header: i18n.t('replacement_name'),
          accessorKey: 'replacementName',
          size: 200
        },
        {
          header: i18n.t('from'),
          accessorKey: 'from',
          size: 120
        },
        {
          header: i18n.t('to'),
          accessorKey: 'to',
          size: 120
        },
        {
          header: i18n.t('taken_grants'),
          accessorKey: 'takenGrants',
          size: 200
        }
      ],
      [
        {
          header: i18n.t('name'),
          accessorKey: 'name',
          size: 200
        }
      ]
    ];
  }, []);

  return (
    <>
      <Helmet>
        <title>{i18n.t('choose_replacement').toString()}</title>
      </Helmet>
      <Grid display={'flex'} flexDirection={'column'} gap={'10px'}>
        <Grid display={'flex'} flexDirection={'row'} gap={'20px'}>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            maxDate={new Date()}
            value={formData.from}
            placeholder={i18n.t('from')}
            onChange={(e) => {
              setFormData((prevValues) => ({
                ...prevValues,
                from: e
              }));
            }}
          />
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            maxDate={new Date()}
            value={formData.to}
            placeholder={i18n.t('to')}
            onChange={(e) => {
              setFormData((prevValues) => ({
                ...prevValues,
                to: e
              }));
            }}
          />
        </Grid>
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
            <Tab
              sx={{ backgroundColor: theme.colors.secondary.dark }}
              value={'ROLE_REPLACEMENT'}
              label={i18n.t('role_replacement').toString()}
            />
          </Tabs>
          <TabPanel value={'JOB_REPLACEMENT'}>
            <Grid display={'flex'} flexDirection={'column'} gap={'10px'}>
              <Grid
                display={'flex'}
                flexDirection={'row'}
                sx={{
                  border: `3px solid ${theme.colors.secondary.dark}`,
                  padding: '10px'
                }}
              >
                <RichTreeView
                  sx={{
                    mt: '10px',
                    width: '500px'
                  }}
                  expandedItems={expandedIds}
                  onExpandedItemsChange={(
                    event: React.SyntheticEvent,
                    itemIds: string[]
                  ) => {
                    setExpandedIds(itemIds);
                  }}
                  items={replacementJobs}
                  // onSelectedItemsChange={(event, itemIds) => setSelectedRole(itemIds[0])}
                />
              </Grid>
              <MyCustomTable
                enableRowNumbers={true}
                enableRowActions={true}
                rowActions={({
                  row
                }: {
                  row: { original: { id: string | number } };
                }) => (
                  <IconButton color="error" onClick={() => console.log('as')}>
                    <Delete />
                  </IconButton>
                )}
                columns={jobsColumns}
                data={takenJobsGrants}
                caption={i18n.t('taken_grants').toString()}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={'ROLE_REPLACEMENT'}>
            <Grid display={'flex'} flexDirection={'column'} gap={'10px'}>
              <Grid
                display={'flex'}
                flexDirection={'row'}
                gap={'20px'}
                sx={{
                  border: `3px solid ${theme.colors.secondary.dark}`,
                  padding: '20px'
                }}
              >
                <Grid display={'flex'} flexDirection={'column'} width={'50%'}>
                  <Typography
                    width={'100%'}
                    sx={{
                      paddingBottom: '5px',
                      borderBottom: `1px solid ${theme.colors.primary.dark}`
                    }}
                  >
                    {i18n.t('available_grants').toString()}
                  </Typography>
                </Grid>
                <Grid display={'flex'} flexDirection={'column'} width={'50%'}>
                  <Typography
                    width={'100%'}
                    sx={{
                      paddingBottom: '5px',
                      borderBottom: `1px solid ${theme.colors.primary.dark}`
                    }}
                  >
                    {i18n.t('taken_grants').toString()}
                  </Typography>
                </Grid>
              </Grid>
              <MyCustomTable
                enableRowNumbers={true}
                enableRowActions={true}
                columns={rolesColumns}
                data={takenGrants}
                caption={i18n.t('taken_grants').toString()}
              />
            </Grid>
          </TabPanel>
        </TabContext>
        {!loading && (
          <OpGrid
            onClear={() => {
              setFormData({
                from: undefined,
                to: undefined
              });
            }}
            onCreateOrEdit={async () => {
              setLoading(true);
            }}
            onClose={() => navigate('/usermanagement')}
          />
        )}
        {loading && <Loader />}
      </Grid>
    </>
  );
}

export default ChooseReplacement;
