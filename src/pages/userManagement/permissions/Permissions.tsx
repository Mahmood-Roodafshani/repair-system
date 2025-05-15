import { MyCustomTable, TableRowAction } from '@/components';
import { Button, ButtonType, ConfirmationDialog } from '@/components/form';
import { CommonService, permissionService } from '@/services';
import { Pagination, PermissionDto, permissionInitialValues } from '@/types';
import { Box, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import CreateOrEditForm from './components/CreateOrEditForm';
import { OptionType } from '@/constant';

interface TableRow extends PermissionDto {
  index: number;
  original: PermissionDto;
}

function Permissions() {
  const { t } = useTranslation();
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PermissionDto>();
  const [operationTypes, setOperationTypes] = useState<OptionType[]>();
  const [selectedRowForDelete, setSelectedRowForDelete] = useState<number>();
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 10
  });
  const [totalCount, setTotalCount] = useState<number>(0);
  const [refetchingData, setRefetchingData] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await permissionService.getAll({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      });
      // setTotalCount(response.totalElements);
      // setPermissions(response.content);
      setPermissions(response);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error(t('error_fetching_permissions'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetchData = useCallback(async () => {
    if (totalCount === 0) return;
    setPermissions([]);
    setRefetchingData(true);
    try {
      const response = await permissionService.getAll({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      });
      setPermissions(response);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error(t('error_fetching_permissions'));
    } finally {
      setRefetchingData(false);
    }
  }, [pagination, totalCount]);

  useEffect(() => {
    refetchData();
  }, [pagination]);

  const fetchOperationTypes = async () => {
    setIsLoading(true);
    try {
      const response = await CommonService.getOperationTypes();
      setOperationTypes(
        response.map((e: any) => ({
          id: e.operationCode,
          label: e.operationName
        }))
      );
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error(t('error_fetching_operation_types'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ((showCreateForm || selectedRow) && !operationTypes) {
      fetchOperationTypes();
    }
  }, [showCreateForm, selectedRow]);

  const columns = useMemo(
    () => [
      {
        header: t('row_number'),
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
        header: t('permission_identifier'),
        accessorKey: 'identifier'
      },
      {
        header: t('name'),
        accessorKey: 'name'
      },
      {
        header: t('operation_type'),
        accessorKey: 'operationType'
      },
      {
        header: t('status'),
        Cell: ({ row }: { row: TableRow }) =>
          row.original.state === 'ACTIVE' ? t('active') : t('inactive')
      }
    ],
    []
  );

  const handleEdit = (row: PermissionDto) => {
    setSelectedRow(row);
  };

  return (
    <Box>
      {!selectedRow && !showCreateForm && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{t('permissions')}</Typography>
              <Button
                buttonType={ButtonType.ADD}
                variant="contained"
                color="primary"
                onClick={() => setShowCreateForm(true)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <MyCustomTable
              rowCount={totalCount}
              pagination={pagination}
              onPaginationChange={setPagination}
              enablePagination
              isRefetching={refetchingData}
              columns={columns}
              data={permissions}
              isLoading={isLoading}
              enableRowActions
              rowActions={({ row }: { row: TableRow }) => (
                <TableRowAction
                  onEdit={() => handleEdit(row.original)}
                  onDelete={() => setSelectedRowForDelete(row.original.code)}
                />
              )}
            />
          </Grid>
        </Grid>
      )}

      {(showCreateForm || selectedRow) && operationTypes && (
        <CreateOrEditForm
          initialValues={
            selectedRow
              ? {
                  ...selectedRow,
                  operationType:
                    operationTypes
                      .find((e) => e.label === selectedRow.operationType)
                      ?.id?.toString() || ''
                }
              : permissionInitialValues
          }
          operationTypes={operationTypes}
          onSuccess={(newItem) => {
            if (showCreateForm) setPermissions([newItem, ...permissions]);
            else if (selectedRow !== undefined) {
              setPermissions(
                permissions.map((e: PermissionDto) => {
                  if (e.code === selectedRow?.code) return newItem;
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
      <ConfirmationDialog
        id="remove_modal"
        open={selectedRowForDelete !== undefined}
        onClose={() => setSelectedRowForDelete(undefined)}
        closeOnEsc={true}
        dialogTitle={t('confirm_remove')}
        dialogOkBtnAction={async () => {
          if (!selectedRowForDelete) return;
          setIsLoading(true);
          try {
            await permissionService.delete(selectedRowForDelete);
            setPermissions(
              permissions.filter((e) => e.code !== selectedRowForDelete)
            );
            toast.success(t('permission_removed').toString());
          } catch (error) {
            console.error('Error fetching permissions:', error);
            toast.error(t('error_removing_permission'));
          } finally {
            setIsLoading(false);
          }
        }}
      />
    </Box>
  );
}

export default Permissions;
