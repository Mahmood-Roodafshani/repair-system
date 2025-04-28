import { Delete } from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';
import {
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import { useMemo, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Helmet } from 'react-helmet-async';
import DatePicker from 'react-multi-date-picker';
import { useNavigate } from 'react-router';
import {
  CustomRichTreeView,
  Loader,
  MyCustomTable,
  OpGrid
} from 'src/components';
import { i18n } from 'src/localization';
import { grantsMock, jobsMock } from 'src/mock';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import { TakenGrants } from './takenGrants';
import { DateObject } from 'react-multi-date-picker';

interface FormData {
  from: DateObject | undefined;
  to: DateObject | undefined;
}

function ChooseReplacement() {
  const [formData, setFormData] = useState<FormData>({
    from: undefined,
    to: undefined
  });
  const [selectedTab, setSelectedTab] = useState<
    'JOB_REPLACEMENT' | 'ROLE_REPLACEMENT'
  >('JOB_REPLACEMENT');
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [takenJobsGrants] = useState<any[]>([
    { name: 'سازمانی' }
  ]);
  const [takenGrants] = useState<TakenGrants[]>([]);
  const [replacementJobs] = useState<any[]>(jobsMock);
  const [replacementGrants] = useState<any[]>(grantsMock);

  // don't use mock and use service instead

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

  const handleFromDateChange = (e: DateObject) => {
    setFormData((prevValues: FormData) => ({
      ...prevValues,
      from: e
    }));
  };

  const handleToDateChange = (e: DateObject) => {
    setFormData((prevValues: FormData) => ({
      ...prevValues,
      to: e
    }));
  };

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
            onChange={handleFromDateChange}
          />
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            maxDate={new Date()}
            value={formData.to}
            placeholder={i18n.t('to')}
            onChange={handleToDateChange}
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
                <CustomRichTreeView
                  label=""
                  sx={{
                    width: '500px'
                  }}
                  items={mapAllIdsInNestedArray('role_', replacementJobs)}
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
                  <IconButton
                    color="error"
                    onClick={() => {
                      //todo: impl onDelete
                      console.log('as');
                    }}
                  >
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
                rowActions={({
                  row
                }: {
                  row: { original: { id: string | number } };
                }) => (
                  <IconButton
                    color="error"
                    onClick={() => {
                      //todo: impl onDelete
                      console.log('as');
                    }}
                  >
                    <Delete />
                  </IconButton>
                )}
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
