import {
  AddTwoTone,
  Delete,
  MinimizeTwoTone,
  PlusOneTwoTone
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CustomRichTreeView,
  InlineLoader,
  MyCustomTable
} from 'src/components';
import { i18n } from 'src/i18n';
import { Button, ButtonType } from 'src/mahmood-components';
import {
  fetchGrantsByAccess,
  fetchUserGrantsByAccess,
  getGroupAccesses,
  getGroupAccessRoles,
  getRolesWithGrants
} from 'src/service';
import { RichViewType } from 'src/types';
import { findItemById, mapAllIdsInNestedArray } from 'src/utils/helper';

type TABS = 'HEFAZAT' | 'FARAJA' | 'JOBS' | 'ROLES' | 'GROUP_ACCESS';
type UserGrants = {
  access: TABS;
  grants?: {
    name: string;
    id: string | number;
  }[];
};

function Grants({
  userId,
  onClose
}: {
  userId: string | number;
  onClose: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState<TABS>('HEFAZAT');
  const [loading, setLoading] = useState(false);
  const handleChange = (_: React.SyntheticEvent, newValue: TABS) => {
    setSelectedTab(newValue);
  };
  const [selectedOpenTab, setSelectedOpenTab] = useState<number | false>(false);
  const [grants, setGrants] = useState<RichViewType[]>();
  const [groupAccesses, setGroupAccesses] = useState<any[]>();
  const [roles, setRoles] = useState<any[]>();
  const [userGrants, setUserGrants] = useState<UserGrants[]>([
    { access: 'FARAJA' },
    { access: 'HEFAZAT' },
    { access: 'JOBS' },
    { access: 'GROUP_ACCESS' },
    { access: 'ROLES' }
  ]);

  const changeAccess = useCallback(() => {
    if (
      userGrants.find((userGrant) => userGrant.access === selectedTab)
        .grants !== undefined
    )
      return;

    setLoading(true);
    if (selectedTab === 'GROUP_ACCESS') {
      Promise.all([
        getGroupAccesses({}),
        fetchUserGrantsByAccess({ userId: userId, accessId: selectedTab })
      ])
        .then((res) => {
          if (res[0].statusCode === 200) setGroupAccesses(res[0].content);
          if (res[1].statusCode === 200) {
            setUserGrants(
              userGrants.map((userGrant) => {
                if (userGrant.access !== selectedTab) return userGrant;
                return {
                  access: selectedTab,
                  grants: res[1].content.map((e) => ({
                    id: e.id,
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
        .then((res) => {
          if (res[0].statusCode === 200) setRoles(res[0].content);
          if (res[1].statusCode === 200) {
            setUserGrants(
              userGrants.map((userGrant) => {
                if (userGrant.access !== selectedTab) return userGrant;
                return {
                  access: selectedTab,
                  grants: res[1].content.map((e) => ({
                    id: e.id,
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
    setGrants(undefined);
    Promise.all([
      fetchGrantsByAccess({ accessId: selectedTab }),
      fetchUserGrantsByAccess({ userId: userId, accessId: selectedTab })
    ])
      .then((res) => {
        if (res[0].statusCode === 200) setGrants(res[0].content);
        if (res[1].statusCode === 200) {
          setUserGrants(
            userGrants.map((userGrant) => {
              if (userGrant.access !== selectedTab) return userGrant;
              return {
                access: userGrant.access,
                grants: res[1].content
              };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, [selectedTab, userGrants]);

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
                <IconButton
                  color="error"
                  onClick={() => {
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
                >
                  <Delete />
                </IconButton>
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
                    onChange={(e) => {
                      setUserGrants(
                        userGrants.map((userGrant) => {
                          if (userGrant.access === selectedTab) {
                            return {
                              access: selectedTab,
                              grants: e.target.checked
                                ? [
                                    ...userGrant.grants,
                                    { id: groupAccess.id.toString(), name: '' }
                                  ]
                                : userGrant.grants.filter(
                                    (grant) =>
                                      grant.id.toString() !==
                                      groupAccess.id.toString()
                                  )
                            };
                          }
                          return userGrant;
                        })
                      );
                    }}
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
                            onChange={(e) => {
                              setRoles(
                                roles.map((_r) => {
                                  if (_r.id === role.id) {
                                    _r.grants = _r.grants.map((_g) => {
                                      if (_g.id === grant.id)
                                        _g.hasAccess = e.target.checked;
                                      return _g;
                                    });
                                  }
                                  return _r;
                                })
                              );
                            }}
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
            onClick={() => console.log(userGrants)}
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
