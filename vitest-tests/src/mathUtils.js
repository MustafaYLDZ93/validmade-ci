export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => {
  if (b === 0) throw new Error('Sıfıra bölme hatası');
  return a / b;
};
export const power = (base, exp) => Math.pow(base, exp);
export const sqrt = (n) => {
  if (n < 0) throw new Error('Negatif sayının karekökü alınamaz');
  return Math.sqrt(n);
};
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
export const average = (nums) => {
  if (!nums.length) throw new Error('Boş dizi');
  return nums.reduce((s, n) => s + n, 0) / nums.length;
};
