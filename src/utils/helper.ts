import { RichViewType } from 'src/types';

export function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export function extractIds(obj) {
  let ids = [];

  // Iterate over the keys of the object
  for (let key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      // If it's an object, recurse into it
      ids = ids.concat(extractIds(obj[key]));
    } else if (key === 'id') {
      // If we find the ID, add it to the list
      ids.push(obj[key]);
    }
  }

  return ids;
}

export const CKEditorToolbar = {
  toolbar: {
    items: [
      'heading',
      '|',
      'style',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'alignment',
      'fontColor',
      'fontSize',
      'fontFamily',
      'fontBackgroundColor',
      'highlight',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'uploadImage',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo'
    ]
  },
  image: {
    toolbar: [
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      '|',
      'linkImage',
      'toggleImageCaption',
      'imageTextAlternative',
      'imageResize'
    ]
  },
  table: {
    toolbar: ['tableProperties', 'tableColumnResize'],
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  }
};

export function findItemById(array: RichViewType[], id: string) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    // Check if this item has the right id
    if (item.id === id) {
      return item;
    }

    // If the item has children, recursively search in them
    if (item.children && Array.isArray(item.children)) {
      const foundInChildren = findItemById(item.children, id);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }

  return null; // Return null if item is not found
}

// Function to find the node in the tree by ID and keep track of the parent chain
export function findNodeWithParents(
  node: RichViewType,
  targetId: string,
  parentChain = []
) {
  if (node.id === targetId) {
    return { node, parents: parentChain };
  }
  if (!node.children || node.children.length === 0) {
    return null;
  }
  for (const child of node.children) {
    const result = findNodeWithParents(child, targetId, [...parentChain, node]);
    if (result) return result;
  }
  return null;
}

// Function to find all parents of a node, bottom to top
export function findAllParents(nodeId: string, tree: RichViewType[]) {
  for (const node of tree) {
    const result = findNodeWithParents(node, nodeId);
    if (result) return result.parents;
  }

  return [];
}

function getIdsWithNonZeroChildren(objects: RichViewType[]) {
  let result = [];

  objects.forEach((obj) => {
    if (obj.children && obj.children.length > 0) {
      result.push(obj.id);
      result = result.concat(getIdsWithNonZeroChildren(obj.children));
    }
  });

  return result;
}

export function findAllNodesWithChild(tree: RichViewType[]) {
  return getIdsWithNonZeroChildren(tree);
}

export function mapAllIdsInNestedArray(prefix: string, tree: RichViewType[]) {
  if (tree === undefined) return [];
  return tree.map((e) => ({
    id: prefix + e.id,
    label: e.label,
    children: mapAllIdsInNestedArray(prefix, e.children)
  }));
}
