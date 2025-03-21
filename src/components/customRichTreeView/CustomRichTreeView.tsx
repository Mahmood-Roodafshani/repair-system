import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Grid, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useEffect, useState } from 'react';
import { RichViewType } from 'src/types';
import {
  findAllNodesWithChild,
  findAllParents,
  findLeafs
} from 'src/utils/helper';

function CustomRichTreeView({
  sx = { width: '500px' },
  label,
  items,
  defaultValue,
  onSelectedItemsChange,
  error,
  justSelectLeaf = false,
  multiSelect = false,
  checkboxSelection = false,
  expandAllItems = false,
  clearFlag = false
}: {
  sx?: any;
  label?: string;
  items: RichViewType[];
  defaultValue?: string[];
  onSelectedItemsChange?: (event: React.SyntheticEvent, itemIds: any) => void;
  error?: string;
  justSelectLeaf?: boolean;
  multiSelect?: boolean;
  checkboxSelection?: boolean;
  expandAllItems?: boolean;
  clearFlag?: boolean;
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [leafs, setLeafs] = useState<string[]>();

  useEffect(() => {
    if (justSelectLeaf) setLeafs(findLeafs(items));
  }, [justSelectLeaf]);

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue.length > 0)
      setSelectedItems(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (clearFlag) setSelectedItems([]);
  }, [clearFlag]);

  useEffect(() => {
    if (expandAllItems) setExpandedItems(findAllNodesWithChild(items));
  }, [expandAllItems]);

  useEffect(() => {
    if (expandAllItems || expandedItems?.length > 0) return;
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
  }, [defaultValue, expandAllItems]);

  useEffect(() => {
    if (
      expandedItems === undefined ||
      expandedItems.length > 0 ||
      items?.length > 1 ||
      expandAllItems
    )
      return;

    setExpandedItems([items[0].id]);
  }, [items, expandedItems, expandAllItems]);

  const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.grey[200],
    [`& .${treeItemClasses.content}`]: {
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(0.5, 1),
      margin: theme.spacing(0.2, 0),
      [`& .${treeItemClasses.label}`]: {
        fontSize: '0.8rem',
        fontWeight: 500
      }
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.dark,
      padding: theme.spacing(0, 1.2),
      ...theme.applyStyles('light', {
        backgroundColor: alpha(theme.palette.primary.main, 0.25)
      }),
      ...theme.applyStyles('dark', {
        color: theme.palette.primary.contrastText
      })
    },
    [`& .${treeItemClasses.groupTransition}`]: {
      marginRight: 15,
      paddingRight: 18,
      borderRight: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
    },
    ...theme.applyStyles('light', {
      color: theme.palette.grey[800]
    })
  }));

  return (
    <Grid display={'flex'} flexDirection={'column'}>
      {label && (
        <Stack spacing={2} direction="row">
          <Typography color={error ? 'error' : undefined}>{label}</Typography>
        </Stack>
      )}
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
          selectedItems={selectedItems}
          checkboxSelection={checkboxSelection}
          multiSelect={multiSelect}
          expandedItems={expandedItems}
          disableSelection={onSelectedItemsChange === undefined}
          onExpandedItemsChange={(
            _: React.SyntheticEvent,
            itemIds: string[]
          ) => {
            setExpandedItems(itemIds);
          }}
          slots={{
            item: CustomTreeItem,
            expandIcon: AddBoxIcon,
            collapseIcon: IndeterminateCheckBoxIcon
          }}
          items={items}
          onSelectedItemsChange={
            justSelectLeaf
              ? (_, itemIds) => {
                  const filteredItems = Array.isArray(itemIds)
                    ? itemIds.filter((itr) => leafs.indexOf(itr) !== -1)
                    : leafs.indexOf(itemIds) !== -1
                    ? [itemIds]
                    : undefined;

                  if (
                    filteredItems === undefined ||
                    filteredItems.length === 0
                  ) {
                    setSelectedItems([]);
                    return;
                  }
                  setSelectedItems(filteredItems);
                  onSelectedItemsChange(_, filteredItems);
                }
              : (_, itemIds) => {
                  setSelectedItems(
                    Array.isArray(itemIds) ? itemIds : [itemIds]
                  );
                  onSelectedItemsChange(_, itemIds);
                }
          }
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
