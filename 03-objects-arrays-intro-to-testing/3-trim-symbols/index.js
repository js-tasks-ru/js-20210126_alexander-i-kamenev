/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (!string || size === 0) {
    return '';
  }
  if (size === undefined) {
    return string;
  }

  let current = string[0];
  let result = current;
  let counter = 1;

  for (const s of string.slice(1)) {
    if (current !== s) {
      current = s;
      counter = 1;
      result += s;
      // eslint-disable-next-line no-empty
    } else if (counter >= size) {
    } else {
      counter += 1;
      result += s;
    }
  }
  return result;
}
