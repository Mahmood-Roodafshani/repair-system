import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { CustomRichTreeView, Loader, OpGrid } from 'src/components';
import { i18n } from 'src/localization';
import { SystemFullRolesMock } from 'src/mock';
import { RichViewType, SystemRolesResponse } from 'src/types';
import { mapAllIdsInNestedArray } from 'src/utils/helper';

function EditSystem({
  systemId,
  systemName,
  onBack
}: {
  systemId: string | number;
  systemName: string;
  onBack: () => void;
}) {
  const [title, setTitle] = useState<string>(systemName);
  const [roles, setRoles] =
    useState<Omit<SystemRolesResponse, 'status'>[]>(SystemFullRolesMock);
  const [loading, setLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>();

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
        items={mapAllIdsInNestedArray('role_', roles)}
        // onSelectedItemsChange={(_, itemIds) => setSelectedRole(itemIds[0])}
      />
      {loading && <Loader />}
    </Grid>
  );
}

export default EditSystem;
