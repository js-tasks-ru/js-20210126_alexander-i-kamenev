/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let res = {};
  for (let entry of Object.entries(obj)) {
    if (fields.includes(entry[0])) {
      res[entry[0]] = entry[1];
    }
  }
  return res;
};
