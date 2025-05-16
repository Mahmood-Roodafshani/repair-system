import { Add, PersonAdd } from '@mui/icons-material';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Loader, MyCustomTable, OpGrid, TableRowAction } from 'src/components';
import { Button, ButtonType, ConfirmationDialog } from '@/components/form';
import { SystemResponseType } from 'src/types';
import CreateNewRoleDialog from './components/CreateNewRoleDialog';
import CreateNewSystemDialog from './components/CreateNewSystemDialog';
import EditSystem from './components/EditSystem';
import SystemRoles from './components/SystemRoles';
import { useTranslation } from 'react-i18next';
import { roleManagementService } from '@/services';

interface RoleManagementProps {
  onBack?: () => void;
}

function RoleManagement({ onBack }: RoleManagementProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [title, setTitle] = useState<string>('');
  const [systems, setSystems] = useState<SystemResponseType[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
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
        Cell: ({
          row
        }: {
          row: { index: number; original: SystemResponseType };
        }) => {
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
        header: t('row_number'),
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
        header: t('name'),
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
        header: t('status'),
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
    try {
      setLoading(true);
      const response = await roleManagementService.getAll();
      // const transformedSystems: SystemResponseType[] = response.map((role) => ({
      //   id: role.id,
      //   title: role.name,
      //   status: (role.status ?? true).toString()
      // }));
      // setSystems(transformedSystems);
    } catch (error) {
      toast.error('Failed to fetch system roles');
    } finally {
      setLoading(false);
    }
  }, [title]);

  useEffect(() => {
    setSelectedSystemId(undefined);
  }, [systems]);

  const selectedSystem = selectedSystemId
    ? systems.find((e) => e.id === selectedSystemId)
    : null;

  const handleRemoveSystem = async () => {
    if (!selectedSystemId) return;
    try {
      setRemoving(true);
      await roleManagementService.removeSystem(selectedSystemId);
      setSystems(systems.filter((e) => e.id !== selectedSystemId));
      toast.success('سامانه مورد نظر با موفقیت حذف گردید');
    } catch (error) {
      toast.error('Failed to remove system');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('roles_management').toString()}</title>
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
                label={t('system_title').toString()}
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
                    text={t('new_system')}
                    showIcon={false}
                    onClick={() => setShowCreateNewSystemDialog(true)}
                    color="success"
                    variant="contained"
                  />
                }
                onClose={onBack || (() => navigate('/usermanagement'))}
              />
            )}
          </Grid>

          {!removing && (
            <MyCustomTable
              enableRowActions={true}
              isLoading={loading}
              rowActions={({ row }: { row: { original: { id: number } } }) => (
                <TableRowAction
                  additionalIconButton={
                    <IconButton
                      onClick={() => {
                        setSelectedSystemId(row.original.id);
                        setShowCreateNewRoleDialog(true);
                      }}
                      color="primary"
                    >
                      <PersonAdd />
                    </IconButton>
                  }
                  onEdit={() => {
                    setSelectedSystemId(row.original.id);
                    setShowSystemEditPanel(true);
                  }}
                  onDelete={() => {
                    setSelectedSystemId(row.original.id);
                    setShowConfirmationModelForRemove(true);
                  }}
                />
              )}
              columns={columns}
              data={systems}
            />
          )}

          <CreateNewRoleDialog
            systemId={selectedSystemId ?? 0}
            systemName={selectedSystem?.title ?? ''}
            open={showCreateNewRoleDialog}
            onClose={() => setShowCreateNewRoleDialog(false)}
            onSuccess={() => {
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
            dialogTitle={t('confirm_remove')}
            dialogOkBtnAction={handleRemoveSystem}
          />
        </>
      )}
      {showSystemRoles && (
        <SystemRoles
          onBack={() => {
            setSelectedSystemId(undefined);
            setShowSystemRoles(false);
          }}
          systemId={selectedSystemId ?? 0}
        />
      )}
      {showSystemEditPanel && (
        <EditSystem
          systemId={selectedSystemId ?? 0}
          systemName={selectedSystem?.title ?? ''}
        />
      )}
    </>
  );
}

export default RoleManagement;
