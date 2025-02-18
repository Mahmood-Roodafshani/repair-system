import { LoadingButton } from '@mui/lab';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'src/components';
import { i18n } from 'src/i18n';
import { getSystemRoles, storeNewRole } from 'src/service';
import { SystemRolesResponse } from 'src/types';

function CreateNewRoleDialog({
  systemId,
  systemName,
  open,
  onClose,
  onAdd
}: {
  systemId: number | string;
  systemName: string;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [roleName, setRoleName] = useState<string>();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [roles, setRoles] = useState<SystemRolesResponse[]>();
  const [fetchingRoles, setFetchingRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>();

  useEffect(() => {
    if (systemId === undefined) return;
    setFetchingRoles(true);
    Promise.all([getSystemRoles({ systemId: systemId })])
      .then((res) => {
        if (res[0].statusCode === 200) {
          setRoles(res[0].content);

          setExpandedItems([
            'system_' + systemId.toString(),
            ...res[0].content.map((e) => e.id.toString())
          ]);
        }
      })
      .finally(() => setFetchingRoles(false));
  }, [systemId]);

  const handleExpandedItemsChange = (
    event: React.SyntheticEvent,
    itemIds: string[]
  ) => {
    setExpandedItems(itemIds);
  };

  return (
    <Dialog sx={{ margin: '0 auto' }} onClose={onClose} open={open}>
      <DialogTitle>{i18n.t('role').toString()}</DialogTitle>
      <TextField
        required
        onChange={(e) => setRoleName(e.target.value)}
        label={i18n.t('job_title').toString()}
      />
      {fetchingRoles && (
        <CircularProgress
          sx={{ margin: '10px auto' }}
          size={24}
          disableShrink
          thickness={3}
        />
      )}
      {!fetchingRoles && systemId && (
        <SimpleTreeView
          sx={{
            mt: '10px'
          }}
          expandedItems={expandedItems}
          onExpandedItemsChange={handleExpandedItemsChange}
          onSelectedItemsChange={(event, itemIds) =>
            setSelectedRole(itemIds[0])
          }
        >
          <TreeItem itemId={'system_' + systemId.toString()} label={systemName}>
            {roles &&
              roles.map((role, index) => {
                return (
                  <TreeItem
                    itemId={role.id.toString()}
                    label={role.label}
                    key={index}
                  />
                );
              })}
          </TreeItem>
        </SimpleTreeView>
      )}
      <Grid display={'flex'} flexDirection={'row'} gap={'10px'} mt={'10px'}>
        <Button variant="outlined" color="error" onClick={onClose}>
          {i18n.t('cancel').toString()}
        </Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="success"
          onClick={async () => {
            if (!roleName || roleName?.length < 2) {
              toast.error('لطفا عنوان نقش را وارد نمایید');
              return;
            }
            if (selectedRole === undefined) {
              toast.error('لطفا نقش را وارد نمایید');
              return;
            }
            setLoading(true);
            storeNewRole({
              systemId: systemId,
              roleId: selectedRole,
              title: roleName
            })
              .then((res) => {
                if (res.statusCode === 200) {
                  toast.success('نقش مورد نظر با موفقیت افزوده شد');
                  onAdd();
                }
              })
              .finally(() => setLoading(false));
          }}
        >
          {i18n.t('save').toString()}
        </LoadingButton>
      </Grid>
    </Dialog>
  );
}

export default CreateNewRoleDialog;
