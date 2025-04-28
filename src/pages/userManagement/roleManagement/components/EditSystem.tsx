import { Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { CustomRichTreeView, Loader, OpGrid } from 'src/components';
import { i18n } from 'src/localization';
import { roleManagementService } from 'src/services/userManagement/roleManagementService';
import { SystemRolesResponse } from 'src/types/responses/userManagement/roleManagement';
import { mapAllIdsInNestedArray } from 'src/utils/helper';
import { RichViewType } from 'src/types';

interface EditSystemProps {
  systemId: number;
  systemName: string;
  onBack: () => void;
}

function EditSystem({ systemId, systemName, onBack }: EditSystemProps) {
  const [title, setTitle] = useState<string>(systemName);
  const [roles, setRoles] = useState<SystemRolesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    if (systemId) {
      setLoading(true);
      roleManagementService.getSystemRoles(systemId)
        .then((roles) => {
          setRoles(roles);
        })
        .finally(() => setLoading(false));
    }
  }, [systemId]);

  const mappedRoles: RichViewType[] = roles.map(role => ({
    id: role.id.toString(),
    label: role.name,
    children: role.children?.map(child => ({
      id: child.id.toString(),
      label: child.name,
      children: child.children?.map(grandChild => ({
        id: grandChild.id.toString(),
        label: grandChild.name
      }))
    }))
  }));

  const handleSelectedItemsChange = (event: React.SyntheticEvent, itemIds: string | string[]) => {
    const safeItemIds = Array.isArray(itemIds) ? itemIds : [itemIds].filter(Boolean) as string[];
    setSelectedRoles(safeItemIds);
  };

  return (
    <Grid display={'flex'} flexDirection={'column'} gap={'10px'}>
      <Grid display={'flex'} flexDirection={'row'} gap={'10px'}>
        <TextField
          value={title}
          label={i18n.t('system_title').toString()}
          onChange={(event) => setTitle(event.target.value)}
        />
        <OpGrid
          onClear={() => setTitle('')}
          onCreateOrEdit={async () => {
            setLoading(true);
          }}
          onClose={onBack}
        />
      </Grid>
      <CustomRichTreeView
        sx={{
          width: '500px'
        }}
        label=""
        items={mapAllIdsInNestedArray('role_', mappedRoles)}
        onSelectedItemsChange={handleSelectedItemsChange}
        multiSelect={true}
      />
      {loading && <Loader />}
    </Grid>
  );
}

export default EditSystem;
