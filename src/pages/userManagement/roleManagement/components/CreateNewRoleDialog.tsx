import { Grid, TextField, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { i18n } from 'src/localization';
import { ConfirmationDialog } from '@/components/form';
import { roleManagementService } from 'src/services/userManagement/roleManagementService';
import { CustomRichTreeView } from 'src/components';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import { SystemRolesResponse } from 'src/types/responses/userManagement/roleManagement';
import { RichViewType } from 'src/types';

interface CreateNewRoleDialogProps {
  systemId: number;
  systemName: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function CreateNewRoleDialog({ systemId, systemName, open, onClose, onSuccess }: CreateNewRoleDialogProps) {
  const [loading, setLoading] = useState(false);
  const [fetchingRoles, setFetchingRoles] = useState(false);
  const [roles, setRoles] = useState<SystemRolesResponse[]>([]);
  const [roleName, setRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState<number>();

  useEffect(() => {
    if (systemId) {
      setFetchingRoles(true);
      roleManagementService.getSystemRoles(systemId)
        .then((roles) => {
          setRoles(roles);
        })
        .finally(() => setFetchingRoles(false));
    }
  }, [systemId]);

  const handleCreate = async () => {
    if (!roleName || roleName?.length < 2) {
      toast.error(i18n.t('role_title_is_req').toString());
      return;
    }
    if (selectedRole === undefined) {
      toast.error(i18n.t('role_is_req').toString());
      return;
    }
    setLoading(true);
    try {
      await roleManagementService.storeNewRole({
        name: roleName,
        systemId: systemId
      });
      toast.success(i18n.t('role_created').toString());
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(i18n.t('error_creating_role').toString());
    } finally {
      setLoading(false);
    }
  };

  const mappedRoles: RichViewType[] = roles.map(role => ({
    id: role.id.toString(),
    label: role.name,
    children: role.children?.map(child => ({
      id: child.id.toString(),
      label: child.name
    }))
  }));

  return (
    <ConfirmationDialog
      open={open}
      onClose={onClose}
      dialogTitle={i18n.t('create_new_role')}
      closeOnEsc={true}
    >
      <Grid display={'flex'} flexDirection={'column'} gap={'20px'}>
        <Typography>{i18n.t('system_name')}: {systemName}</Typography>
        <TextField
          name="name"
          label={i18n.t('role_name')}
          value={roleName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoleName(e.target.value)}
        />
        {!fetchingRoles && systemId && (
          <CustomRichTreeView
            sx={{
              mt: '10px'
            }}
            onSelectedItemsChange={(_, itemIds) => setSelectedRole(Number(itemIds[0]))}
            items={mapAllIdsInNestedArray('system_', mappedRoles)}
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
            onClick={handleCreate}
          >
            {i18n.t('save').toString()}
          </LoadingButton>
        </Grid>
      </Grid>
    </ConfirmationDialog>
  );
}

export default CreateNewRoleDialog;
