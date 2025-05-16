import { Button, ButtonType, ConfirmationDialog } from '@/components/form';
import { permissionService, roleManagementService } from '@/services';
import { Box, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { MyCustomTable, TableRowAction } from 'src/components';
import {
  Pagination,
  PermissionDto,
  RoleDto,
  roleInitialValues
} from 'src/types';
import CreateOrEditForm from './components/CreateOrEditForm';

interface TableRow extends RoleDto {
  index: number;
  original: RoleDto;
}

function RoleManagement() {
  const { t } = useTranslation();

  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showConfirmationModelForRemove, setShowConfirmationModelForRemove] =
    useState(false);
  const [selectedRow, setSelectedRow] = useState<RoleDto>();
  const [permissions, setPermissions] = useState<PermissionDto[]>();
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 5
  });
  const [totalCount, setTotalCount] = useState<number>(0);
  const [refetchingData, setRefetchingData] = useState(false);

  const columns = useMemo(
    () => [
      {
        header: t('row_number'),
        enableHiding: false,
        Cell: ({ row }: { row: TableRow }) => {
          return (
            <Typography sx={{ textAlign: 'right' }} key={'row_' + row.index}>
              {pagination.pageIndex * pagination.pageSize + row.index + 1}
            </Typography>
          );
        },
        size: 40
      },
      {
        header: t('name'),
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
        header: t('status'),
        Cell: ({ row }: { row: TableRow }) =>
          row.original.status === 'ACTIVE' ? t('active') : t('inactive')
      }
    ],
    [pagination]
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await roleManagementService.getAllWithPage({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      });
      setTotalCount(response.totalElements);
      setRoles(response.content);
    } catch (error) {
      toast.error('Failed to fetch system roles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPermission = useCallback(async () => {
    setLoading(true);
    try {
      const response = await permissionService.getAll();
      setPermissions(response);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error(t('error_fetching_operation_types'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if ((showCreateForm || selectedRow) && !permissions) fetchPermission();
  }, [selectedRow, showCreateForm]);

  const refetchData = useCallback(async () => {
    if (totalCount === 0) return;
    setRoles([]);
    setRefetchingData(true);
    try {
      const response = await roleManagementService.getAllWithPage({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      });
      setRoles(response.content);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error(t('error_fetching_roles'));
    } finally {
      setRefetchingData(false);
    }
  }, [pagination, totalCount]);

  useEffect(() => {
    refetchData();
  }, [pagination]);

  const handleRemoveSystem = async () => {
    if (!selectedRoleId) return;
    try {
      setRemoving(true);
      await roleManagementService.delete(selectedRoleId);
      setRoles(roles.filter((e) => e.id !== selectedRoleId));
      toast.success(t('permission_removed'));
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
      <Box>
        {!showCreateForm && !selectedRow && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">{t('roles_management')}</Typography>
                <Button
                  buttonType={ButtonType.ADD}
                  variant="contained"
                  color="primary"
                  onClick={() => setShowCreateForm(true)}
                />
              </Box>
            </Grid>

            {!removing && (
              <Grid item xs={12}>
                <MyCustomTable
                  rowCount={totalCount}
                  pagination={pagination}
                  onPaginationChange={setPagination}
                  enablePagination
                  isRefetching={refetchingData}
                  enableRowActions
                  isLoading={loading}
                  rowActions={({ row }: { row: TableRow }) => (
                    <TableRowAction
                      onEdit={() => {
                        setSelectedRow(row.original);
                      }}
                      onDelete={() => {
                        setSelectedRoleId(row.original.id);
                        setShowConfirmationModelForRemove(true);
                      }}
                    />
                  )}
                  columns={columns}
                  data={roles}
                />
              </Grid>
            )}

            <ConfirmationDialog
              id="remove_modal"
              open={showConfirmationModelForRemove}
              onClose={() => setShowConfirmationModelForRemove(false)}
              closeOnEsc={true}
              dialogTitle={t('confirm_remove')}
              dialogOkBtnAction={handleRemoveSystem}
            />
          </Grid>
        )}
        {(showCreateForm || selectedRow) && permissions && (
          <CreateOrEditForm
            initialValues={
              selectedRow
                ? {
                    ...selectedRow
                  }
                : roleInitialValues
            }
            permissions={permissions}
            onSuccess={(newItem) => {
              if (showCreateForm) {
                setRoles([newItem, ...roles]);
                setTotalCount(totalCount + 1);
              } else if (selectedRoleId !== undefined) {
                setRoles(
                  roles.map((e: RoleDto) => {
                    if (e.id === selectedRoleId) return newItem;
                    return e;
                  })
                );
              }
            }}
            onClose={() => {
              setSelectedRow(undefined);
              setShowCreateForm(false);
            }}
          />
        )}
      </Box>
    </>
  );
}

export default RoleManagement;
