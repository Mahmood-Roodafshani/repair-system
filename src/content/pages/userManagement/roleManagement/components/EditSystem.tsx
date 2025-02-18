import { Grid, TextField } from '@mui/material';
import { RichTreeView } from '@mui/x-tree-view';
import { useEffect, useState } from 'react';
import { Loader, OpGrid } from 'src/components';
import { i18n } from 'src/i18n';
import { SystemFullRolesMock } from 'src/mock';

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
  const [roles, setRoles] = useState<any>(SystemFullRolesMock);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (roles === undefined) return;

    setExpandedItems([
      'system_' + systemId,
      ...roles.map((e) => e.id.toString())
    ]);
  }, [roles]);

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
      <RichTreeView
        sx={{
          mt: '10px',
          width: '500px'
        }}
        expandedItems={expandedItems}
        onExpandedItemsChange={(
          event: React.SyntheticEvent,
          itemIds: string[]
        ) => {
          setExpandedItems(itemIds);
        }}
        items={roles.map((e) => ({
          id: e.id,
          children: e.children,
          label: e.label
        }))}
        // onSelectedItemsChange={(event, itemIds) => setSelectedRole(itemIds[0])}
      />
      {loading && <Loader />}
    </Grid>
  );
}

export default EditSystem;
