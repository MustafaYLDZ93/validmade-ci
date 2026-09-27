const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const deepMerge = (target, source) => {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      out[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
};

const pick = (obj, keys) => Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]));

const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

const flattenObj = (obj, prefix = '') => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(acc, flattenObj(v, key));
    } else {
      acc[key] = v;
    }
    return acc;
  }, {});
};

const isEmpty = (obj) => obj == null || Object.keys(obj).length === 0;

const mapValues = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));

module.exports = { deepClone, deepMerge, pick, omit, flattenObj, isEmpty, mapValues };
