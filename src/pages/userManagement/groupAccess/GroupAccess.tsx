import { Button, ButtonType, ConfirmationDialog } from '@/components/form';
import { groupAccessService, roleManagementService } from '@/services';
import {
  GroupAccessDto,
  groupAccessInitialValues,
  Pagination,
  RoleDto
} from '@/types';
import { Box, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Loader, MyCustomTable, TableRowAction } from 'src/components';
import CreateOrEditForm from './components/CreateOrEditForm';

interface TableRow extends GroupAccessDto {
  index: number;
  original: GroupAccessDto;
}

function GroupAccess() {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<GroupAccessDto[]>([]);
  const [selectedRow, setSelectedRow] = useState<GroupAccessDto>();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [showConfirmationForRemove, setShowConfirmationForRemove] =
    useState(false);
  const [removing, setRemoving] = useState(false);
  const [roles, setRoles] = useState<RoleDto[]>();
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
        accessorKey: 'name'
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
      const response = await groupAccessService.getAllWithPage({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      });
      setTotalCount(response.totalElements);
      setGroups(response.content);
    } catch (error) {
      toast.error('Failed to fetch group access list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await roleManagementService.getAll();
      setRoles(response);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error(t('error_fetching_roles'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if ((showCreateForm || selectedRow) && !roles) fetchRoles();
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

  return (
    <>
      <Helmet>
        <title>{t('manage_group_access')}</title>
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
                  enableHiding={false}
                  enableFilters={false}
                  rowActions={({ row }: { row: { original: TableRow } }) => (
                    <TableRowAction
                      onEdit={() => {
                        setSelectedRow(row.original);
                      }}
                      onDelete={() => {
                        setSelectedGroupId(row.original.id);
                        setShowConfirmationForRemove(true);
                      }}
                    />
                  )}
                  data={groups}
                  columns={columns}
                />
              </Grid>
            )}
            {loading && <Loader />}
            <ConfirmationDialog
              id="remove_modal"
              open={showConfirmationForRemove}
              onClose={() => setShowConfirmationForRemove(false)}
              closeOnEsc={true}
              dialogTitle={t('confirm_remove')}
              dialogOkBtnAction={async () => {
                if (!selectedGroupId) return;
                setRemoving(true);
                try {
                  groupAccessService.delete(selectedGroupId);

                  setGroups(groups.filter((e) => e.id !== selectedGroupId));
                  toast.success('گروه مورد نظر با موفقیت حذف گردید');
                } catch (error) {
                  toast.error('Failed to remove group access');
                } finally {
                  setRemoving(false);
                }
              }}
            />
          </Grid>
        )}
        {(showCreateForm || selectedRow) && roles && (
          <CreateOrEditForm
            initialValues={
              selectedRow
                ? {
                    ...selectedRow
                  }
                : groupAccessInitialValues
            }
            roles={roles}
            onSuccess={(newItem) => {
              if (showCreateForm) {
                setGroups([newItem, ...groups]);
                setTotalCount(totalCount + 1);
              } else if (selectedRow !== undefined) {
                setRoles(
                  roles.map((e: RoleDto) => {
                    if (e.id === selectedRow.id) return newItem;
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

export default GroupAccess;
