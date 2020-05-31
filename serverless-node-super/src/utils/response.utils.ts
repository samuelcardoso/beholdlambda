/**
 * Flattens an deeply nested object
 * @param resp the response object
 * @returns Array
 */
export const flatObjResponse = (resp): [] => {
  if (!Array.isArray(resp)) {
    resp = [resp];
  }

  return resp.map(item => {
    const newObj = {};

    if (typeof item.toJSON === 'function') {
      item = item.toJSON();
    }

    Object.keys(item).forEach(key => {
      if (typeof item[key] === 'object' && item[key]) {
        Object.keys(item[key]).forEach(innerKey => {
          newObj[`${innerKey}`] = item[key][innerKey];
        });
      } else {
        newObj[key] = item[key];
      }
    });

    return newObj;
  });
};
