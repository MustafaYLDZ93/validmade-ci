const { strict: assert } = require('assert');
const { deepClone, deepMerge, pick, omit, flattenObj, isEmpty, mapValues } = require('../src/objectUtils');

describe('objectUtils', () => {
  describe('deepClone', () => {
    it('derin kopya oluşturur', () => {
      const orig = { a: { b: 1 } };
      const clone = deepClone(orig);
      clone.a.b = 99;
      assert.equal(orig.a.b, 1);
    });
    it('diziyi klonlar', () => {
      const orig = [1, [2, 3]];
      const clone = deepClone(orig);
      clone[1][0] = 99;
      assert.equal(orig[1][0], 2);
    });
  });

  describe('deepMerge', () => {
    it('iki nesneyi derin birleştirir', () => {
      const result = deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 });
      assert.deepEqual(result, { a: 1, b: { c: 2, d: 3 }, e: 4 });
    });
    it('kaynak değerleri üzerine yazar', () => {
      const result = deepMerge({ a: 1 }, { a: 2 });
      assert.equal(result.a, 2);
    });
  });

  describe('pick', () => {
    it('belirtilen anahtarları seçer', () => {
      const result = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
      assert.deepEqual(result, { a: 1, c: 3 });
    });
    it('olmayan anahtarları atlar', () => {
      const result = pick({ a: 1 }, ['a', 'z']);
      assert.deepEqual(result, { a: 1 });
    });
  });

  describe('omit', () => {
    it('belirtilen anahtarları çıkarır', () => {
      const result = omit({ a: 1, b: 2, c: 3 }, ['b']);
      assert.deepEqual(result, { a: 1, c: 3 });
    });
    it('olmayan anahtarı çıkarmaya çalışınca değiştirmez', () => {
      const result = omit({ a: 1 }, ['z']);
      assert.deepEqual(result, { a: 1 });
    });
  });

  describe('flattenObj', () => {
    it('iç içe nesneyi düzleştirir', () => {
      const result = flattenObj({ a: { b: { c: 1 } }, d: 2 });
      assert.deepEqual(result, { 'a.b.c': 1, d: 2 });
    });
    it('düz nesne değişmez', () => {
      const result = flattenObj({ a: 1, b: 2 });
      assert.deepEqual(result, { a: 1, b: 2 });
    });
  });

  describe('isEmpty', () => {
    it('boş nesne için true döner', () => assert.equal(isEmpty({}), true));
    it('null için true döner', () => assert.equal(isEmpty(null), true));
    it('dolu nesne için false döner', () => assert.equal(isEmpty({ a: 1 }), false));
  });

  describe('mapValues', () => {
    it('tüm değerlere fonksiyon uygular', () => {
      const result = mapValues({ a: 1, b: 2, c: 3 }, v => v * 2);
      assert.deepEqual(result, { a: 2, b: 4, c: 6 });
    });
    it('key parametresini geçirir', () => {
      const result = mapValues({ x: 1 }, (v, k) => `${k}=${v}`);
      assert.deepEqual(result, { x: 'x=1' });
    });
  });
});
