import { describe, it, expect } from 'vitest';
import { unique, flatten, groupBy, chunk, sortBy, intersection, difference } from '../src/arrayUtils.js';

describe('arrayUtils', () => {
  describe('unique', () => {
    it('tekrar eden elemanları kaldırır', () => expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]));
    it('boş dizi döner', () => expect(unique([])).toEqual([]));
    it('string dizisinde çalışır', () => expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']));
  });

  describe('flatten', () => {
    it('iç içe diziyi düzleştirir', () => expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]));
    it('düz diziyi değiştirmez', () => expect(flatten([1, 2, 3])).toEqual([1, 2, 3]));
  });

  describe('groupBy', () => {
    it('key değerine göre gruplar', () => {
      const data = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
      expect(groupBy(data, 'type')).toEqual({ a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] });
    });
  });

  describe('chunk', () => {
    it('diziyi parçalara böler', () => expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]));
    it('tam bölünür', () => expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]));
    it('geçersiz boyutta hata fırlatır', () => expect(() => chunk([1, 2], 0)).toThrow());
  });

  describe('sortBy', () => {
    it('artan sıralar', () => {
      const data = [{ n: 3 }, { n: 1 }, { n: 2 }];
      expect(sortBy(data, 'n').map(d => d.n)).toEqual([1, 2, 3]);
    });
    it('azalan sıralar', () => {
      const data = [{ n: 1 }, { n: 3 }, { n: 2 }];
      expect(sortBy(data, 'n', 'desc').map(d => d.n)).toEqual([3, 2, 1]);
    });
  });

  describe('intersection', () => {
    it('kesişim kümesi bulur', () => expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]));
    it('kesişim yoksa boş döner', () => expect(intersection([1, 2], [3, 4])).toEqual([]));
  });

  describe('difference', () => {
    it('fark kümesi bulur', () => expect(difference([1, 2, 3], [2, 3])).toEqual([1]));
    it('tümü farklıysa hepsini döner', () => expect(difference([1, 2], [3, 4])).toEqual([1, 2]));
  });
});
