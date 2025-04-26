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

interface Grant extends RichViewType {
  id: string;
  name: string;
}

interface UserGrant {
  access: TABS;
  grants: Array<{
    id: string;
    name: string;
  }>;
}

type TABS = 'HEFAZAT' | 'FARAJA' | 'JOBS' | 'ROLES' | 'GROUP_ACCESS';

type MockResponse<T> = {
  statusCode: number;
  content: T[];
};

type GroupAccessResponse = MockResponse<GroupAccess>;
type RolesResponse = MockResponse<RichViewType>;
type UserGrantsResponse = MockResponse<UserGrant>;

type ServiceResponse<T> = AxiosResponse<T> | MockResponse<T>;

const isMockResponse = <T,>(response: ServiceResponse<T>): response is MockResponse<T> => {
  return 'statusCode' in response && 'content' in response;
};

const isAxiosResponse = <T,>(response: ServiceResponse<T>): response is AxiosResponse<T> => {
  return 'status' in response && 'data' in response;
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
  userId: string | number;
  onClose: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState<TABS>('FARAJA');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOpenTab, setSelectedOpenTab] = useState<number | false>(false);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [groupAccesses, setGroupAccesses] = useState<any[]>();
  const [roles, setRoles] = useState<any[]>();
  const [userGrants, setUserGrants] = useState<UserGrant[]>([
    { access: 'FARAJA', grants: [] },
    { access: 'HEFAZAT', grants: [] },
    { access: 'JOBS', grants: [] },
    { access: 'GROUP_ACCESS', grants: [] },
    { access: 'ROLES', grants: [] }
  ]);
  const [error, setError] = useState<string | null>(null);

  const changeAccess = useCallback(() => {
    const currentUserGrant = userGrants.find((userGrant) => userGrant.access === selectedTab);
    if (currentUserGrant?.grants !== undefined) return;

    setLoading(true);
    if (selectedTab === 'GROUP_ACCESS') {
      Promise.all([
        getGroupAccesses({}),
        fetchUserGrantsByAccess({ userId: userId, accessId: selectedTab })
      ])
        .then((responses) => {
          const [groupAccessResponse, userGrantsResponse] = responses;
          
          const groupAccesses = getResponseData<GroupAccess>(groupAccessResponse as ServiceResponse<GroupAccess>);
          if (groupAccesses && groupAccesses.length > 0) {
            setGroupAccesses(groupAccesses);
          }
          
          const userGrantsData = getResponseData<UserGrant>(userGrantsResponse as ServiceResponse<UserGrant>);
          if (userGrantsData && userGrantsData.length > 0) {
            setUserGrants(
              userGrants.map((userGrant) => {
                if (userGrant.access !== selectedTab) return userGrant;
                return {
                  access: selectedTab,
                  grants: userGrantsData.map((grant) => ({
                    id: grant.id,
                    name: ''
                  }))
                };
              })
            );
          }
        })
        .finally(() => setLoading(false));
      return;
    }
    if (selectedTab === 'ROLES') {
      Promise.all([
        getRolesWithGrants(),
        fetchUserGrantsByAccess({ userId: userId, accessId: selectedTab })
      ])
        .then((responses) => {
          const [rolesResponse, userGrantsResponse] = responses;
          
          const roles = getResponseData<RichViewType>(rolesResponse as ServiceResponse<RichViewType>);
          if (roles && roles.length > 0) {
            setRoles(roles);
          }
          
          const userGrantsData = getResponseData<UserGrant>(userGrantsResponse as ServiceResponse<UserGrant>);
          if (userGrantsData && userGrantsData.length > 0) {
            setUserGrants(
              userGrants.map((userGrant) => {
                if (userGrant.access !== selectedTab) return userGrant;
                return {
                  access: selectedTab,
                  grants: userGrantsData.map((grant) => ({
                    id: grant.id,
                    name: ''
                  }))
                };
              })
            );
          }
        })
        .finally(() => setLoading(false));
      return;
    }

    fetchGrantsByAccess({ accessId: selectedTab })
      .then((response) => {
        if (isMockResponse(response)) {
          if (response.statusCode === 200 && response.content && response.content.length > 0) {
            setGrants(response.content as Grant[]);
          }
        } else if (isAxiosResponse(response)) {
          if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
            setGrants(response.data as Grant[]);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [selectedTab, userId, userGrants]);

  useEffect(() => {
    changeAccess();
  }, [selectedTab]);

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

  const handleExpandTab =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setSelectedOpenTab(isExpanded ? panel : false);
    };

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setSelectedTab(newValue as TABS);
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const grantId = event.target.name;
      const grant = grants.find((g) => g.id === grantId);
      
      if (!grant) return;

      setUserGrants((prevUserGrants) => {
        return prevUserGrants.map((userGrant) => {
          if (userGrant.access !== selectedTab) return userGrant;
          
          const currentGrants = userGrant.grants;
          const updatedGrants = checked
            ? [...currentGrants, { id: grant.id, name: grant.name }]
            : currentGrants.filter((g) => g.id !== grantId);
            
          return {
            access: selectedTab,
            grants: updatedGrants
          };
        });
      });
    },
    [grants, selectedTab]
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
            const grant = grants.find((g) => g.id === id);
            return {
              id,
              name: grant ? grant.name : ''
            };
          })
        };
      });
    });
  }, [selectedTab, userGrants, grants]);

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
      {(selectedTab === 'HEFAZAT' ||
        selectedTab === 'FARAJA' ||
        selectedTab === 'JOBS') && (
        <Grid display={'flex'} flexDirection={'column'} mt={'20px'}>
          {loading && <InlineLoader />}
          {grants && (
            <CustomRichTreeView
              onSelectedItemsChange={(_, itemIds) => {
                setUserGrants(
                  userGrants.map((userGrant) => {
                    if (userGrant.access === selectedTab) {
                      return {
                        access: selectedTab,
                        grants: itemIds.map((item) => {
                          const grant = findItemById(
                            grants,
                            item.replace('grant_', '')
                          );
                          return {
                            id: grant.id,
                            name: grant.label
                          };
                        })
                      };
                    }
                    return userGrant;
                  })
                );
              }}
              defaultValue={userGrants
                .find((userGrant) => userGrant.access === selectedTab)
                .grants?.map((e) => 'grant_' + e.id)}
              multiSelect={true}
              checkboxSelection={true}
              items={mapAllIdsInNestedArray('grant_', grants)}
            />
          )}
          <Grid mt={'20px'}>
            <MyCustomTable
              caption={i18n.t('taken_grants')}
              isLoading={loading}
              columns={columns}
              enableRowNumbers={true}
              enableRowActions={true}
              rowActions={({
                row
              }: {
                row: { original: { id: string | number } };
              }) => (
                <TableRowAction
                  onDelete={() => {
                    setUserGrants(
                      userGrants.map((userGrant) => {
                        if (userGrant.access === selectedTab) {
                          return {
                            access: selectedTab,
                            grants: userGrant.grants.filter(
                              (grant) => grant.id !== row.original.id
                            )
                          };
                        }
                        return userGrant;
                      })
                    );
                  }}
                />
              )}
              data={
                userGrants.find((userGrant) => userGrant.access === selectedTab)
                  .grants
                  ? userGrants.find(
                      (userGrant) => userGrant.access === selectedTab
                    ).grants
                  : []
              }
            />
          </Grid>
        </Grid>
      )}
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
                  {role.grants.map((grant, itr) => {
                    return (
                      <FormControlLabel
                        key={itr}
                        control={
                          <Checkbox
                            onChange={handleCheckboxChange}
                            name={grant.id}
                            checked={grant.hasAccess}
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
    </>
  );
}

export default Grants;
