import { Add, Delete, Edit, PersonAdd } from '@mui/icons-material';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Loader, MyCustomTable, OpGrid } from 'src/components';
import { i18n } from 'src/i18n';
import { Button, ButtonType, ConfirmationDialog } from 'src/mahmood-components';
import { removeSystem, searchRoleBySystemTitle } from 'src/service';
import { SystemResponseType } from 'src/types';
import CreateNewRoleDialog from './components/CreateNewRoleDialog';
import CreateNewSystemDialog from './components/CreateNewSystemDialog';
import SystemRoles from './components/SystemRoles';
import EditSystem from './components/EditSystem';

function RoleManagement() {
  const [title, setTitle] = useState<string>();
  const [systems, setSystems] = useState<SystemResponseType[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState<string | number>();
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();
  const [showCreateNewRoleDialog, setShowCreateNewRoleDialog] = useState(false);
  const [showCreateNewSystemDialog, setShowCreateNewSystemDialog] =
    useState(false);
  const [showSystemRoles, setShowSystemRoles] = useState(false);
  const [showConfirmationModelForRemove, setShowConfirmationModelForRemove] =
    useState(false);
  const [showSystemEditPanel, setShowSystemEditPanel] = useState(false);

  const columns = useMemo(
    () => [
      {
        header: ' ',
        enableHiding: false,
        Cell: ({ row }) => {
          return (
            <Grid
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
            >
              <IconButton
                key={'show_btn_' + row.index}
                color="primary"
                onClick={() => {
                  setShowSystemRoles(true);
                  setSelectedSystemId(row.original.id);
                }}
              >
                <Add />
              </IconButton>
            </Grid>
          );
        },
        size: 40
      },
      {
        header: i18n.t('row_number'),
        enableHiding: false,
        Cell: ({ row }) => {
          return (
            <Typography sx={{ textAlign: 'right' }} key={'row_' + row.index}>
              {row.index + 1}
            </Typography>
          );
        },
        size: 40
      },
      {
        header: i18n.t('system_title'),
        accessorKey: 'title',
        size: 120,
        muiTableHeadCellProps: {
          align: 'left'
        },
        muiTableBodyCellProps: {
          align: 'right'
        }
      },
      {
        header: i18n.t('status'),
        accessorKey: 'status',
        size: 80,
        muiTableHeadCellProps: {
          align: 'left'
        },
        muiTableBodyCellProps: {
          align: 'right'
        }
      }
    ],
    []
  );

  const fetchData = useCallback(() => {
    setLoading(true);
    setSystems([]);
    searchRoleBySystemTitle({ title: title })
      .then((res) => {
        if (res.statusCode === 200) setSystems(res.content);
      })
      .finally(() => setLoading(false));
  }, [title]);

  useEffect(() => {
    setSelectedSystemId(undefined);
  }, [systems]);

  return (
    <>
      <Helmet>
        <title>{i18n.t('roles_management').toString()}</title>
      </Helmet>
      {!showSystemRoles && !showSystemEditPanel && (
        <>
          <Grid
            display={'flex'}
            flexDirection={'column'}
            gap={'10px'}
            padding={'10px'}
          >
            <Grid>
              <TextField
                label={i18n.t('system_title').toString()}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            {removing && <Loader />}
            {!loading && (
              <OpGrid
                onSearch={() => fetchData()}
                onClear={() => setTitle('')}
                additionalBtn={
                  <Button
                    buttonType={ButtonType.ACCEPT}
                    text={i18n.t('new_system')}
                    showIcon={false}
                    onClick={() => setShowCreateNewSystemDialog(true)}
                    color="success"
                    variant="contained"
                  />
                }
                onClose={() => navigate('/usermanagement')}
              />
            )}
          </Grid>

          {!removing && (
            <MyCustomTable
              enableRowActions={true}
              isLoading={loading}
              rowActions={({
                row
              }: {
                row: { original: { id: string | number } };
              }) => (
                <Grid
                  display={'flex'}
                  flexDirection={'row'}
                  gap={'10px'}
                  justifyContent={'start'}
                >
                  <IconButton
                    onClick={() => {
                      setSelectedSystemId(row.original.id);
                      setShowCreateNewRoleDialog(true);
                    }}
                    color="primary"
                  >
                    <PersonAdd />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => console.info('Edit')}
                  >
                    <Edit
                      onClick={() => {
                        setSelectedSystemId(row.original.id);
                        setShowSystemEditPanel(true);
                      }}
                    />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedSystemId(row.original.id);
                      setShowConfirmationModelForRemove(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              )}
              columns={columns}
              data={systems}
            />
          )}

          <CreateNewRoleDialog
            systemId={selectedSystemId}
            systemName={
              selectedSystemId === undefined
                ? ''
                : systems.find((e) => e.id === selectedSystemId)?.title
            }
            open={showCreateNewRoleDialog}
            onClose={() => setShowCreateNewRoleDialog(false)}
            onAdd={() => {
              setShowCreateNewRoleDialog(false);
              fetchData();
            }}
          />
          <CreateNewSystemDialog
            open={showCreateNewSystemDialog}
            onClose={() => setShowCreateNewSystemDialog(false)}
            onAdd={() => {
              setShowCreateNewSystemDialog(false);
              fetchData();
            }}
          />
          <ConfirmationDialog
            id="remove_modal"
            open={showConfirmationModelForRemove}
            onClose={() => setShowConfirmationModelForRemove(false)}
            closeOnEsc={true}
            dialogTitle={i18n.t('confirm_remove')}
            dialogOkBtnAction={() => {
              setRemoving(true);
              removeSystem({ systemId: selectedSystemId })
                .then((res) => {
                  if (res.statusCode === 200) {
                    setSystems(
                      systems.filter((e) => e.id !== selectedSystemId)
                    );
                    toast.success('سامانه مورد نظر با موفقیت حذف گردید');
                  }
                })
                .finally(() => setRemoving(false));
            }}
          />
        </>
      )}
      {showSystemRoles && (
        <SystemRoles
          onBack={() => {
            setSelectedSystemId(undefined);
            setShowSystemRoles(false);
          }}
          systemId={selectedSystemId}
        />
      )}
      {showSystemEditPanel && (
        <EditSystem
          systemId={selectedSystemId}
          systemName={
            selectedSystemId === undefined
              ? ''
              : systems.find((e) => e.id === selectedSystemId)?.title
          }
          onBack={() => {
            setSelectedSystemId(undefined);
            setShowSystemEditPanel(false);
          }}
        />
      )}
    </>
  );
}

export default RoleManagement;
