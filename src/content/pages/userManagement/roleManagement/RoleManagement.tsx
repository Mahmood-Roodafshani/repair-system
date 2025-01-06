import { Add, Delete, Edit, PersonAdd } from '@mui/icons-material';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { LoadingButton } from '@mui/lab';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { MyCustomTable } from 'src/components';
import { searchRoleBySystemTitle } from 'src/service/userManagement/roleManagementService';
import { SystemRolesResponse } from 'src/types';

function RoleManagement() {
  const [title, setTitle] = useState<string>();
  const [systemsRoles, setSystemsRoles] = useState<SystemRolesResponse[]>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
                onClick={() => console.info('Edit')}
              >
                <Add />
              </IconButton>
            </Grid>
          );
        },
        size: 40
      },
      {
        header: 'ردیف',
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
        header: 'عنوان سامانه',
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
        header: 'وضعیت',
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

  return (
    <>
      <Helmet>
        <title>مدیریت نقش ها</title>
      </Helmet>
      <Grid
        display={'flex'}
        flexDirection={'column'}
        gap={'10px'}
        padding={'10px'}
      >
        <Grid>
          <TextField
            label={'عنوان سامانه'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid display={'flex'} flexDirection={'row'} gap={'10px'}>
          <LoadingButton
            loading={loading}
            onClick={async () => {
              setLoading(true);
              setSystemsRoles(undefined);
              searchRoleBySystemTitle({ title: title })
                .then((res) => {
                  if (res.statusCode === 200) setSystemsRoles(res.content);
                })
                .finally(() => setLoading(false));
            }}
            variant="contained"
          >
            جستجو
          </LoadingButton>
          <Button
            color="warning"
            onClick={() => setTitle(undefined)}
            variant="contained"
          >
            پاک
          </Button>
          <Button color="secondary" variant="contained">
            نقش جدید
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => navigate('/usermanagement/')}
            startIcon={<CloseTwoToneIcon />}
          >
            بستن
          </Button>
        </Grid>
      </Grid>
      {systemsRoles && (
        <MyCustomTable
          enableRowActions={true}
          rowActions={({ row }) => (
            <Grid
              display={'flex'}
              flexDirection={'row'}
              gap={'10px'}
              justifyContent={'start'}
            >
              <IconButton color="primary" onClick={() => console.info('Edit')}>
                <PersonAdd />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => console.info('Edit')}
              >
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => console.info('Delete')}>
                <Delete />
              </IconButton>
            </Grid>
          )}
          columns={columns}
          data={systemsRoles}
        />
      )}
    </>
  );
}

export default RoleManagement;
