export const unique = (arr) => [...new Set(arr)];
export const flatten = (arr) => arr.flat(Infinity);
export const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
export const chunk = (arr, size) => {
  if (size <= 0) throw new Error('Chunk boyutu pozitif olmalı');
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
};
export const sortBy = (arr, key, dir = 'asc') =>
  [...arr].sort((a, b) => dir === 'asc' ? (a[key] > b[key] ? 1 : -1) : (a[key] < b[key] ? 1 : -1));
export const intersection = (a, b) => a.filter(x => b.includes(x));
export const difference = (a, b) => a.filter(x => !b.includes(x));
