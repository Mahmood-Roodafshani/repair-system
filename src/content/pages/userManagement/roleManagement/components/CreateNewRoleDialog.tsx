import { LoadingButton } from '@mui/lab';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomRichTreeView } from 'src/components';
import { i18n } from 'src/i18n';
import { getSystemRoles, storeNewRole } from 'src/service';
import { RichViewType } from 'src/types';
import { mapAllIdsInNestedArray } from 'src/utils/helper';

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
  const [roles, setRoles] = useState<RichViewType[]>();
  const [fetchingRoles, setFetchingRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>();

  useEffect(() => {
    if (systemId === undefined) return;
    setFetchingRoles(true);
    Promise.all([getSystemRoles({ systemId: systemId })])
      .then((res) => {
        if (res[0].statusCode === 200) {
          setRoles(res[0].content);
        }
      })
      .finally(() => setFetchingRoles(false));
  }, [systemId]);

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
        <CustomRichTreeView
          sx={{
            mt: '10px'
          }}
          onSelectedItemsChange={(_, itemIds) => setSelectedRole(itemIds[0])}
          items={mapAllIdsInNestedArray('system_', roles)}
        />
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
              toast.error(i18n.t('role_title_is_req').toString());
              return;
            }
            if (selectedRole === undefined) {
              toast.error(i18n.t('role_is_req').toString());
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
                  toast.success(i18n.t('role_created').toString());
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
