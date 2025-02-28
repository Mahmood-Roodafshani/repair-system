import { Grid, Stack, Typography } from '@mui/material';
import { RichTreeView } from '@mui/x-tree-view';
import { useEffect, useState } from 'react';
import { RichViewType } from 'src/types';

function CustomRichTreeView({
  sx,
  label,
  items,
  selectedItems,
  onSelectedItemsChange,
  error,
  justSelectLeaf = false
}: {
  sx?: any;
  label: string;
  items: RichViewType[];
  selectedItems?: string[];
  onSelectedItemsChange: (event: React.SyntheticEvent, itemIds: any) => void;
  error?: string;
  justSelectLeaf?: boolean;
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  useEffect(() => {
    if (items?.length === 1) setExpandedItems([items[0].id]);
  }, [items]);

  useEffect(() => {
    if (selectedItems !== undefined && selectedItems.length > 0)
      setExpandedItems(selectedItems);
  }, [items]);

  return (
    <Grid display={'flex'} flexDirection={'column'}>
      <Stack spacing={2} direction="row">
        <Typography color={error ? 'error' : undefined}>{label}</Typography>
      </Stack>
      <RichTreeView
        sx={
          error
            ? sx === undefined
              ? { borderColor: 'red' }
              : { ...sx, ...{ borderColor: 'red' } }
            : sx
        }
        expandedItems={expandedItems}
        onExpandedItemsChange={(
          event: React.SyntheticEvent,
          itemIds: string[]
        ) => {
          setExpandedItems(itemIds);
        }}
        items={items}
        selectedItems={selectedItems}
        onSelectedItemsChange={onSelectedItemsChange}
      />
      {error && (
        <Typography fontSize={11} fontWeight={'bold'} color="error">
          {error}
        </Typography>
      )}
    </Grid>
  );
}

export default CustomRichTreeView;
