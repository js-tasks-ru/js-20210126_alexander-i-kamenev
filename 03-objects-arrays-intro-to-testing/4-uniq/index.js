/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (arr === undefined) {
    return [];
  }

  const set = new Set();
  const result = [];
  for (const i of arr) {
    if (!set.has(i)) {
      set.add(i);
      result.push(i);
    }
  }
  return result;
}
