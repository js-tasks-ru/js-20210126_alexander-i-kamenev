/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  let res = {};
  for (let entry of Object.entries(obj)) {
    if (!fields.includes(entry[0])) {
      res[entry[0]] = entry[1];
    }
  }
  return res;
};
