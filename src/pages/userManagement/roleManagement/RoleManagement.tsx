import { Add, PersonAdd, ArrowBackTwoTone } from '@mui/icons-material';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Loader, MyCustomTable, OpGrid, TableRowAction } from 'src/components';
import { i18n } from 'src/localization';
import { Button, ButtonType, ConfirmationDialog } from '@/components/form';
import { roleManagementService } from 'src/services/userManagement/roleManagementService';
import { SystemResponseType } from 'src/types';
import CreateNewRoleDialog from './components/CreateNewRoleDialog';
import CreateNewSystemDialog from './components/CreateNewSystemDialog';
import EditSystem from './components/EditSystem';
import SystemRoles from './components/SystemRoles';

interface TableRow {
  index: number;
  original: SystemResponseType;
}

interface RoleManagementProps {
  systemId?: number;
  onBack?: () => void;
}

function RoleManagement({ systemId, onBack }: RoleManagementProps) {
  const [title, setTitle] = useState<string>('');
  const [systems, setSystems] = useState<SystemResponseType[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState<number>(systemId ?? 0);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();
  const [showCreateNewRoleDialog, setShowCreateNewRoleDialog] = useState(false);
  const [showCreateNewSystemDialog, setShowCreateNewSystemDialog] = useState(false);
  const [showSystemRoles, setShowSystemRoles] = useState(false);
  const [showConfirmationModelForRemove, setShowConfirmationModelForRemove] = useState(false);
  const [showSystemEditPanel, setShowSystemEditPanel] = useState(false);

  const columns = useMemo(
    () => [
      {
        header: ' ',
        enableHiding: false,
        Cell: ({ row }: { row: TableRow }) => {
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
                  setSelectedSystemId(Number(row.original.id));
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
        Cell: ({ row }: { row: TableRow }) => {
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

  const fetchData = useCallback(async () => {
    if (!title) return;
    setLoading(true);
    try {
      const response = await roleManagementService.getSystemRoles(Number(title));
      const transformedSystems: SystemResponseType[] = response.map(role => ({
        id: role.id,
        title: role.name,
        status: (role.status ?? true).toString()
      }));
      setSystems(transformedSystems);
    } catch {
      toast.error(i18n.t('error_fetching_systems'));
    } finally {
      setLoading(false);
    }
  }, [title]);

  useEffect(() => {
    if (systemId) {
      setSelectedSystemId(systemId);
    }
  }, [systemId]);

  const selectedSystem = selectedSystemId ? systems.find((e) => e.id === selectedSystemId) : undefined;

  const handleRemoveSystem = async () => {
    if (!selectedSystemId) return;
    setRemoving(true);
    try {
      await roleManagementService.removeSystem(selectedSystemId);
      setSystems(systems.filter(system => system.id !== selectedSystemId));
      toast.success(i18n.t('system_removed_successfully'));
    } catch (error) {
      toast.error(i18n.t('error_removing_system'));
      console.error(error);
    } finally {
      setRemoving(false);
      setShowConfirmationModelForRemove(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('roles_management').toString()}</title>
      </Helmet>
      <Box>
        {!showSystemRoles && !showSystemEditPanel && (
          <>
            <Grid container spacing={2} alignItems="center" mb={2}>
              <Grid item xs>
                <Typography variant="h3">Role Management</Typography>
              </Grid>
              {onBack && (
                <Grid item>
                  <Button
                    buttonType={ButtonType.CANCEL}
                    variant="outlined"
                    onClick={onBack}
                    startIcon={<ArrowBackTwoTone />}
                    text={i18n.t('back')}
                  />
                </Grid>
              )}
              <Grid item>
                <TextField
                  label={i18n.t('system_title').toString()}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>

            {removing && <Loader />}
            {!loading && (
              <OpGrid
                onSearch={fetchData}
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

            {!removing && (
              <MyCustomTable
                enableRowActions
                isLoading={loading}
                rowActions={({
                  row
                }: {
                  row: { original: SystemResponseType };
                }) => (
                  <TableRowAction
                    additionalIconButton={
                      <IconButton
                        onClick={() => {
                          setSelectedSystemId(Number(row.original.id));
                          setShowCreateNewRoleDialog(true);
                        }}
                        color="primary"
                      >
                        <PersonAdd />
                      </IconButton>
                    }
                    onEdit={() => {
                      setSelectedSystemId(Number(row.original.id));
                      setShowSystemEditPanel(true);
                    }}
                    onDelete={() => {
                      setSelectedSystemId(Number(row.original.id));
                      setShowConfirmationModelForRemove(true);
                    }}
                  />
                )}
                data={systems}
                columns={columns}
              />
            )}
          </>
        )}

        {showCreateNewRoleDialog && selectedSystemId && selectedSystem && (
          <CreateNewRoleDialog
            open={showCreateNewRoleDialog}
            onClose={() => setShowCreateNewRoleDialog(false)}
            systemId={selectedSystemId}
            systemName={selectedSystem.title}
            onSuccess={() => {
              setShowCreateNewRoleDialog(false);
              fetchData();
            }}
          />
        )}

        {showCreateNewSystemDialog && (
          <CreateNewSystemDialog
            open={showCreateNewSystemDialog}
            onClose={() => setShowCreateNewSystemDialog(false)}
            onAdd={() => {
              setShowCreateNewSystemDialog(false);
              fetchData();
            }}
          />
        )}

        {showSystemRoles && selectedSystemId && (
          <SystemRoles
            systemId={selectedSystemId}
            onBack={() => setShowSystemRoles(false)}
          />
        )}

        {showSystemEditPanel && selectedSystemId && selectedSystem && (
          <EditSystem
            systemId={selectedSystemId}
            systemName={selectedSystem.title}
          />
        )}

        <ConfirmationDialog
          open={showConfirmationModelForRemove}
          onClose={() => setShowConfirmationModelForRemove(false)}
          dialogTitle={i18n.t('remove_system')}
          dialogOkBtnAction={handleRemoveSystem}
        />
      </Box>
    </>
  );
}

export default RoleManagement;
