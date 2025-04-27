import { Grid, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Loader, MyCustomTable, OpGrid, TableRowAction } from 'src/components';
import { i18n } from 'src/localization';
import { Button, ButtonType, ConfirmationDialog } from '@/components/form';
import { permissionService } from 'src/services/userManagement/permissionService';
import { PermissionDto } from 'src/types/responses/userManagement/roleManagement/permissionDto';
import CreatePermissionDialog from './components/CreatePermissionDialog';
import EditPermissionDialog from './components/EditPermissionDialog';

function Permission() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<PermissionDto>();
  const navigate = useNavigate();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const columns = useMemo(
    () => [
      {
        header: i18n.t('row_number'),
        enableHiding: false,
        Cell: ({ row }: { row: { index: number } }) => {
          return (
            <Typography sx={{ textAlign: 'right' }} key={'row_' + row.index}>
              {row.index + 1}
            </Typography>
          );
        },
        size: 40
      },
      {
        header: i18n.t('permission_id'),
        accessorKey: 'id',
        size: 120,
        muiTableHeadCellProps: {
          align: 'left'
        },
        muiTableBodyCellProps: {
          align: 'right'
        }
      },
      {
        header: i18n.t('permission_name'),
        accessorKey: 'name',
        size: 120,
        muiTableHeadCellProps: {
          align: 'left'
        },
        muiTableBodyCellProps: {
          align: 'right'
        }
      },
      {
        header: i18n.t('description'),
        accessorKey: 'description',
        size: 200,
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
    setLoading(true);
    try {
      const data = await permissionService.getAll();
      setPermissions(data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error(i18n.t('error_fetching_permissions'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredPermissions = useMemo(() => {
    if (!searchTerm) return permissions;
    return permissions.filter(permission =>
      permission.id.toString().includes(searchTerm) ||
      permission.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [permissions, searchTerm]);

  return (
    <>
      <Helmet>
        <title>{i18n.t('permission_management')}</title>
      </Helmet>
      <Grid
        display={'flex'}
        flexDirection={'column'}
        gap={'10px'}
        padding={'10px'}
      >
        <Grid>
          <TextField
            label={i18n.t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        {removing && <Loader />}
        {!loading && (
          <OpGrid
            onSearch={() => fetchData()}
            onClear={() => setSearchTerm('')}
            additionalBtn={
              <Button
                buttonType={ButtonType.ACCEPT}
                text={i18n.t('new_permission')}
                showIcon={false}
                onClick={() => setShowCreateDialog(true)}
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
            row: { original: PermissionDto };
          }) => (
            <TableRowAction
              onEdit={() => {
                setSelectedPermission(row.original);
                setShowEditDialog(true);
              }}
              onDelete={() => {
                setSelectedPermission(row.original);
                setShowConfirmationDialog(true);
              }}
            />
          )}
          columns={columns}
          data={filteredPermissions}
        />
      )}

      <CreatePermissionDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onAdd={() => {
          setShowCreateDialog(false);
          fetchData();
        }}
      />

      {selectedPermission && (
        <EditPermissionDialog
          permission={selectedPermission}
          open={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          onUpdate={() => {
            setShowEditDialog(false);
            fetchData();
          }}
        />
      )}

      <ConfirmationDialog
        id="remove_modal"
        open={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
        closeOnEsc={true}
        dialogTitle={i18n.t('confirm_remove')}
        dialogOkBtnAction={() => {
          if (!selectedPermission) return;
          setRemoving(true);
          permissionService.delete(selectedPermission.id.toString())
            .then(() => {
              setPermissions(permissions.filter(p => p.id !== selectedPermission.id));
              toast.success(i18n.t('permission_deleted_successfully'));
            })
            .catch(error => {
              console.error('Error deleting permission:', error);
              toast.error(i18n.t('error_deleting_permission'));
            })
            .finally(() => setRemoving(false));
        }}
      />
    </>
  );
}

export default Permission; 