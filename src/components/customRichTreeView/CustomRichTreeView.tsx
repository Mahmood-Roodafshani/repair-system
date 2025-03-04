import { Grid, Stack, Typography } from '@mui/material';
import { RichTreeView } from '@mui/x-tree-view';
import { useEffect, useState } from 'react';
import { RichViewType } from 'src/types';
import { findAllParents } from 'src/utils/helper';

function CustomRichTreeView({
  sx,
  label,
  items,
  defaultValue,
  onSelectedItemsChange,
  error,
  justSelectLeaf = false,
  multiSelect = false,
  checkboxSelection = false
}: {
  sx?: any;
  label: string;
  items: RichViewType[];
  defaultValue?: string[];
  onSelectedItemsChange: (event: React.SyntheticEvent, itemIds: any) => void;
  error?: string;
  justSelectLeaf?: boolean;
  multiSelect?: boolean;
  checkboxSelection?: boolean;
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>();

  useEffect(() => {
    if (defaultValue === undefined || defaultValue.length === 0) {
      setExpandedItems([]);
      return;
    }

    let allParents: string[] = [];
    for (const node of defaultValue) {
      const parents = findAllParents(node, items);

      for (const parent of parents) {
        if (!allParents.includes(parent.id)) {
          allParents.push(parent.id);
        }
      }
    }
    setExpandedItems(allParents);
  }, [defaultValue]);

  useEffect(() => {
    if (
      expandedItems === undefined ||
      expandedItems.length > 0 ||
      items?.length > 1
    )
      return;

    setExpandedItems([items[0].id]);
  }, [items, expandedItems]);

  return (
    <Grid display={'flex'} flexDirection={'column'}>
      <Stack spacing={2} direction="row">
        <Typography color={error ? 'error' : undefined}>{label}</Typography>
      </Stack>
      {expandedItems !== undefined && (
        <RichTreeView
          sx={
            error
              ? sx === undefined
                ? { borderColor: 'red' }
                : { ...sx, ...{ borderColor: 'red' } }
              : sx
          }
          defaultSelectedItems={defaultValue}
          checkboxSelection={checkboxSelection}
          multiSelect={multiSelect}
          expandedItems={expandedItems}
          onExpandedItemsChange={(
            _: React.SyntheticEvent,
            itemIds: string[]
          ) => {
            setExpandedItems(itemIds);
          }}
          items={items}
          onSelectedItemsChange={onSelectedItemsChange}
        />
      )}
      {error && (
        <Typography
          mr={'8px'}
          mt={'4px'}
          fontSize={11}
          fontWeight={'bold'}
          color="error"
        >
          {error}
        </Typography>
      )}
    </Grid>
  );
}

export default CustomRichTreeView;
