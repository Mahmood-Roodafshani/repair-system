import { AddTwoTone, MinimizeTwoTone } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CustomRichTreeView,
  InlineLoader,
  MyCustomTable,
  TableRowAction
} from 'src/components';
import { i18n } from 'src/localization';
import { Button, ButtonType } from '@/components/form';
import {
  fetchGrantsByAccess,
  fetchUserGrantsByAccess,
  getRolesWithGrants
} from 'src/services/userManagement/accessControlService';
import { getGroupAccesses } from 'src/services/userManagement/groupAccessService';
import { RichViewType } from 'src/types';
import { findItemById, mapAllIdsInNestedArray } from 'src/utils/helper';
import { AxiosResponse } from 'axios';

type GroupAccess = { id: string; name: string };

interface Grant {
  id: string;
  label: string;
  name: string;
  children: Grant[];
  grants?: Array<{
    id: string;
    name: string;
  }>;
}

interface UserGrant {
  access: TABS;
  grants: Array<{
    id: string;
    name: string;
  }>;
}

type TABS = 'HEFAZAT' | 'FARAJA' | 'JOBS' | 'ROLES' | 'GROUP_ACCESS';

interface MockResponse<T> {
  statusCode: number;
  content: T[];
}

type ServiceResponse<T> = AxiosResponse<T> | MockResponse<T>;

const isMockResponse = <T,>(response: ServiceResponse<T>): response is MockResponse<T> => {
  return 'statusCode' in response;
};

const isAxiosResponse = <T,>(response: ServiceResponse<T>): response is AxiosResponse<T> => {
  return 'data' in response;
};

const getResponseData = <T,>(response: ServiceResponse<T>): T[] => {
  if (isMockResponse(response)) {
    return response.content;
  }
  if (isAxiosResponse(response)) {
    return Array.isArray(response.data) ? response.data : [response.data];
  }
  return [];
};

function Grants({
  userId,
  onClose
}: {
  userId: string;
  onClose: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState<TABS>('HEFAZAT');
  const [loading, setLoading] = useState(false);
  const [selectedOpenTab, setSelectedOpenTab] = useState<number | false>(false);
  const [roles, setRoles] = useState<Grant[]>([]);
  const [userGrants, setUserGrants] = useState<UserGrant[]>([]);
  const [groupAccesses, setGroupAccesses] = useState<GroupAccess[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchGrantsByAccess({ access: selectedTab });
      const grants = response.map(grant => ({
        id: grant.id,
        label: grant.name,
        name: grant.name,
        children: [],
        grants: []
      }));
      setRoles(grants);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [selectedTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: TABS) => {
    setSelectedTab(newValue);
  }, []);

  const handleExpandTab = useCallback(
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setSelectedOpenTab(isExpanded ? panel : false);
    },
    []
  );

  const columns = useMemo(
    () => [
      {
        header: i18n.t('name'),
        accessorKey: 'name',
        size: 150
      }
    ],
    []
  );

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const grantId = event.target.name;
      const grant = roles.find((g) => g.id === grantId);
      
      if (!grant) return;

      setUserGrants((prevGrants) => {
        const currentGrant = prevGrants.find((g) => g.access === selectedTab);
        if (!currentGrant) {
          return [
            ...prevGrants,
            {
              access: selectedTab,
              grants: checked ? [{ id: grantId, name: grant.name }] : []
            }
          ];
        }

        return prevGrants.map((g) => {
          if (g.access !== selectedTab) return g;
          return {
            ...g,
            grants: checked
              ? [...g.grants, { id: grantId, name: grant.name }]
              : g.grants.filter((gr) => gr.id !== grantId)
          };
        });
      });
    },
    [roles, selectedTab]
  );

  const handleGrantSelection = useCallback(
    (event: React.SyntheticEvent, itemIds: string | string[]) => {
      if (!Array.isArray(itemIds)) return;

      const updatedGrants = itemIds.map(id => {
        const grant = roles.find(g => g.id === id);
        return {
          id,
          name: grant?.label || id
        };
      });

      setUserGrants((prevGrants) => {
        const currentGrant = prevGrants.find((g) => g.access === selectedTab);
        if (!currentGrant) {
          return [
            ...prevGrants,
            {
              access: selectedTab,
              grants: updatedGrants
            }
          ];
        }

        return prevGrants.map((g) => {
          if (g.access !== selectedTab) return g;
          return {
            ...g,
            grants: updatedGrants
          };
        });
      });
    },
    [selectedTab, roles]
  );

  const handleSave = useCallback(() => {
    const currentUserGrant = userGrants.find((userGrant) => userGrant.access === selectedTab);
    if (!currentUserGrant) return;

    const grantIds = currentUserGrant.grants.map((grant) => grant.id);
    setUserGrants((prevUserGrants) => {
      return prevUserGrants.map((userGrant) => {
        if (userGrant.access !== selectedTab) return userGrant;
        return {
          access: selectedTab,
          grants: grantIds.map((id) => {
            const grant = roles.find((g) => g.id === id);
            return {
              id,
              name: grant?.label || id
            };
          })
        };
      });
    });
  }, [selectedTab, userGrants, roles]);

  const handleRoles = useCallback((roles: Grant[]) => {
    setRoles(roles.map(role => ({
      id: role.id,
      label: role.label,
      name: role.label || role.id,
      children: role.children || [],
      grants: role.grants || []
    })));
  }, []);

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
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
      <Grid display={'flex'} flexDirection={'column'} mt={'20px'}>
        {loading && <InlineLoader />}
        {roles && roles.length > 0 && (
          <CustomRichTreeView
            onSelectedItemsChange={handleGrantSelection}
            defaultValue={userGrants.find((userGrant) => userGrant.access === selectedTab)?.grants.map(g => g.id) || []}
            multiSelect={true}
            checkboxSelection={true}
            items={roles}
            sx={{ width: '100%' }}
          />
        )}
      </Grid>
      {selectedTab === 'GROUP_ACCESS' && (
        <Grid
          display={'flex'}
          flexDirection={'column'}
          gap={'10px'}
          mt={'20px'}
        >
          {loading && <InlineLoader />}
          {groupAccesses?.map((groupAccess, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name={groupAccess.id}
                    checked={
                      userGrants
                        .find((e) => e.access === selectedTab)
                        ?.grants.find(
                          (e) => e.id.toString() === groupAccess.id.toString()
                        ) !== undefined
                    }
                  />
                }
                label={groupAccess.name}
              />
            );
          })}
        </Grid>
      )}
      {selectedTab === 'ROLES' && (
        <Grid
          display={'flex'}
          flexDirection={'column'}
          gap={'10px'}
          mt={'20px'}
        >
          {loading && <InlineLoader />}
          {roles?.map((role, index) => {
            return (
              <Accordion
                key={index}
                expanded={selectedOpenTab === index}
                onChange={handleExpandTab(index)}
              >
                <AccordionSummary
                  expandIcon={
                    selectedOpenTab === index ? (
                      <MinimizeTwoTone />
                    ) : (
                      <AddTwoTone />
                    )
                  }
                >
                  <Typography component="span">{role.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {role.grants?.map((grant, itr) => {
                    return (
                      <FormControlLabel
                        key={itr}
                        control={
                          <Checkbox
                            onChange={handleCheckboxChange}
                            name={grant.id}
                            checked={userGrants
                              .find((g) => g.access === selectedTab)
                              ?.grants.some((g) => g.id === grant.id)}
                          />
                        }
                        label={grant.name}
                      />
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Grid>
      )}
      <Grid display={'flex'} flexDirection={'column'} gap={'10px'} mt={'10px'}>
        <Grid display={'flex'} flexDirection={'row'} gap={'10px'}>
          <Button
            onClick={handleSave}
            buttonType={ButtonType.CREATE_OR_EDIT}
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
    </Box>
  );
}

export default Grants;
