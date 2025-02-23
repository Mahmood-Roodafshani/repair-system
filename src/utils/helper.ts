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
