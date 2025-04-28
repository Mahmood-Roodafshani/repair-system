import { ArrowBackTwoTone } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { MyCustomTable, TableRowAction } from 'src/components';
import { i18n } from 'src/localization';
import { ConfirmationDialog } from '@/components/form';
import { roleManagementService } from 'src/services/userManagement/roleManagementService';
import { SystemRolesResponse } from 'src/types/responses/userManagement/roleManagement';

interface SystemRolesProps {
  systemId: number;
  onBack: () => void;
}

function SystemRoles({ systemId, onBack }: SystemRolesProps) {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<SystemRolesResponse[]>([]);
  const [selectedRole, setSelectedRole] = useState<number>();

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
        header: i18n.t('role_title'),
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
        header: i18n.t('status'),
        accessorKey: 'status',
        size: 80,
        muiTableHeadCellProps: {
          align: 'left'
        },
        muiTableBodyCellProps: {
          align: 'right'
        },
        Cell: ({ row, cell }: { row: { index: number }; cell: { getValue: () => boolean } }) => {
          return (
            <Typography sx={{ textAlign: 'right' }} key={'row_' + row.index}>
              {cell.getValue()
                ? i18n.t('active').toString()
                : i18n.t('deactive').toString()}
            </Typography>
          );
        }
      }
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    roleManagementService.getSystemRoles(systemId)
      .then((roles) => {
        setRoles(roles);
      })
      .finally(() => setLoading(false));
  }, [systemId]);

  return (
    <>
      <Grid display={'flex'} flexDirection={'row'} justifyContent={'end'}>
        <IconButton color="secondary" onClick={onBack}>
          <ArrowBackTwoTone />
        </IconButton>
      </Grid>
      <MyCustomTable
        enableRowActions={true}
        enableHiding={false}
        enableFilters={false}
        rowActions={({
          row
        }: {
          row: { original: { id: number } };
        }) => (
          //todo: impl onEdit
          <TableRowAction
            onEdit={() => console.info('Edit')}
            onDelete={() => setSelectedRole(row.original.id)}
          />
        )}
        columns={columns}
        data={roles}
        isLoading={loading}
      />
      <ConfirmationDialog
        id="remove_role_modal"
        open={selectedRole !== undefined}
        onClose={() => setSelectedRole(undefined)}
        closeOnEsc={true}
        dialogTitle={i18n.t('confirm_remove')}
        dialogOkBtnAction={() => {
          if (!selectedRole) return;
          setLoading(true);
          roleManagementService.removeRole(selectedRole)
            .then(() => {
              setRoles(roles.filter((e) => e.id !== selectedRole));
              toast.success('سامانه مورد نظر با موفقیت حذف گردید');
              setSelectedRole(undefined);
            })
            .finally(() => setLoading(false));
        }}
      />
    </>
  );
}

export default SystemRoles;
