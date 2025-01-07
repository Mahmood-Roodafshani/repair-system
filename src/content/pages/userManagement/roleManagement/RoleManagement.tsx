import { Add, Delete, Edit, PersonAdd } from '@mui/icons-material';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { MyCustomTable } from 'src/components';
import { removeRole, searchRoleBySystemTitle } from 'src/service';
import { SystemRolesResponse } from 'src/types';
import CreateNewRoleDialog from './components/CreateNewRoleDialog';
import CreateNewSystemDialog from './components/CreateNewSystemDialog';
import { toast } from 'react-toastify';

function RoleManagement() {
  const [title, setTitle] = useState<string>();
  const [systemsRoles, setSystemsRoles] = useState<SystemRolesResponse[]>();
  const [selectedSystemId, setSelectedSystemId] = useState<string | number>();
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();
  const [showCreateNewRoleDialog, setShowCreateNewRoleDialog] = useState(false);
  const [showCreateNewSystemDialog, setShowCreateNewSystemDialog] =
    useState(false);
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

  const fetchData = useCallback(() => {
    setLoading(true);
    setSystemsRoles(undefined);
    searchRoleBySystemTitle({ title: title })
      .then((res) => {
        if (res.statusCode === 200) setSystemsRoles(res.content);
      })
      .finally(() => setLoading(false));
  }, [title]);

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
            onClick={async () => fetchData()}
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
          <Button
            onClick={() => setShowCreateNewSystemDialog(true)}
            color="secondary"
            variant="contained"
          >
            سامانه جدید
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
      {removing && (
        <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'}>
          <CircularProgress color="secondary" size="30px" />
        </Grid>
      )}
      {systemsRoles && !removing && (
        <MyCustomTable
          enableRowActions={true}
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
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={async () => {
                  setRemoving(true);
                  removeRole({ roleId: row.original.id })
                    .then((res) => {
                      if (res.statusCode === 200) {
                        setSystemsRoles(
                          systemsRoles.filter((e) => e.id !== row.original.id)
                        );
                        toast.success('سامانه مورد نظر با موفقیت حذف گردید');
                      }
                    })
                    .finally(() => setRemoving(false));
                }}
              >
                <Delete />
              </IconButton>
            </Grid>
          )}
          columns={columns}
          data={systemsRoles}
        />
      )}
      <CreateNewRoleDialog
        systemId={selectedSystemId}
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
    </>
  );
}

export default RoleManagement;
