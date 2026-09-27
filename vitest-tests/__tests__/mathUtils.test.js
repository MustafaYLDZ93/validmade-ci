import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide, power, sqrt, clamp, average } from '../src/mathUtils.js';

describe('mathUtils', () => {
  describe('add', () => {
    it('iki pozitif sayıyı toplar', () => expect(add(2, 3)).toBe(5));
    it('negatif sayıları toplar', () => expect(add(-1, -2)).toBe(-3));
    it('sıfır ile toplar', () => expect(add(5, 0)).toBe(5));
    it('ondalıklı sayıları toplar', () => expect(add(1.5, 2.5)).toBe(4));
  });

  describe('subtract', () => {
    it('çıkarma işlemi yapar', () => expect(subtract(10, 4)).toBe(6));
    it('negatif sonuç verir', () => expect(subtract(3, 7)).toBe(-4));
  });

  describe('multiply', () => {
    it('çarpma işlemi yapar', () => expect(multiply(3, 4)).toBe(12));
    it('sıfırla çarpar', () => expect(multiply(5, 0)).toBe(0));
    it('negatif sayılarla çarpar', () => expect(multiply(-2, 3)).toBe(-6));
  });

  describe('divide', () => {
    it('bölme işlemi yapar', () => expect(divide(10, 2)).toBe(5));
    it('ondalıklı sonuç verir', () => expect(divide(7, 2)).toBe(3.5));
    it('sıfıra bölünce hata fırlatır', () => expect(() => divide(5, 0)).toThrow('Sıfıra bölme hatası'));
  });

  describe('power', () => {
    it('üs hesaplar', () => expect(power(2, 8)).toBe(256));
    it('sıfırıncı kuvvet', () => expect(power(5, 0)).toBe(1));
  });

  describe('sqrt', () => {
    it('karekök hesaplar', () => expect(sqrt(16)).toBe(4));
    it('negatif sayıda hata fırlatır', () => expect(() => sqrt(-1)).toThrow());
  });

  describe('clamp', () => {
    it('aralık içinde bırakır', () => expect(clamp(5, 1, 10)).toBe(5));
    it('minimum sınırlar', () => expect(clamp(-5, 0, 10)).toBe(0));
    it('maksimum sınırlar', () => expect(clamp(15, 0, 10)).toBe(10));
  });

  describe('average', () => {
    it('ortalama hesaplar', () => expect(average([1, 2, 3, 4, 5])).toBe(3));
    it('boş dizide hata fırlatır', () => expect(() => average([])).toThrow('Boş dizi'));
  });
});
