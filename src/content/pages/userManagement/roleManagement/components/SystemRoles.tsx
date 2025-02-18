import { ArrowBackTwoTone, Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { MyCustomTable } from 'src/components';
import { i18n } from 'src/i18n';
import { ConfirmationDialog } from 'src/mahmood-components';
import { getSystemRoles, removeRole } from 'src/service';
import { SystemRolesResponse } from 'src/types';

function SystemRoles({
  systemId,
  onBack
}: {
  systemId: number | string;
  onBack: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<SystemRolesResponse[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | number>();

  const columns = useMemo(
    () => [
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
        header: i18n.t('role_title'),
        accessorKey: 'label',
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
        Cell: ({ row, cell }) => {
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
    Promise.all([getSystemRoles({ systemId: systemId })])
      .then((res) => {
        if (res[0].statusCode === 200) setRoles(res[0].content);
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
          row: { original: { id: string | number } };
        }) => (
          <Grid
            display={'flex'}
            flexDirection={'row'}
            gap={'10px'}
            justifyContent={'start'}
          >
            <IconButton color="secondary" onClick={() => console.info('Edit')}>
              <Edit />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => setSelectedRole(row.original.id)}
            >
              <Delete />
            </IconButton>
          </Grid>
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
          setLoading(true);
          removeRole({ roleId: selectedRole })
            .then((res) => {
              if (res.statusCode === 200) {
                setRoles(roles.filter((e) => e.id !== selectedRole));
                toast.success('سامانه مورد نظر با موفقیت حذف گردید');
                setSelectedRole(undefined);
              }
            })
            .finally(() => setLoading(false));
        }}
      />
    </>
  );
}

export default SystemRoles;
