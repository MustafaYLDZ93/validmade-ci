const { add, subtract, multiply, divide, percentage } = require('../src/calculator');

describe('Calculator', () => {
  describe('add()', () => {
    test('toplama: pozitif sayılar', () => {
      expect(add(2, 3)).toBe(5);
    });
    test('toplama: negatif sayı ile', () => {
      expect(add(-1, 5)).toBe(4);
    });
    test('toplama: sıfır ile', () => {
      expect(add(0, 7)).toBe(7);
    });
    test('toplama: ondalıklı sayılar', () => {
      expect(add(1.1, 2.2)).toBeCloseTo(3.3);
    });
  });

  describe('subtract()', () => {
    test('çıkarma: temel', () => {
      expect(subtract(10, 3)).toBe(7);
    });
    test('çıkarma: negatif sonuç', () => {
      expect(subtract(3, 10)).toBe(-7);
    });
  });

  describe('multiply()', () => {
    test('çarpma: temel', () => {
      expect(multiply(4, 5)).toBe(20);
    });
    test('çarpma: sıfır ile', () => {
      expect(multiply(99, 0)).toBe(0);
    });
    test('çarpma: negatif ile', () => {
      expect(multiply(-3, 4)).toBe(-12);
    });
  });

  describe('divide()', () => {
    test('bölme: temel', () => {
      expect(divide(10, 2)).toBe(5);
    });
    test('bölme: ondalık sonuç', () => {
      expect(divide(7, 2)).toBe(3.5);
    });
    test('bölme: sıfıra bölünce hata fırlatır', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero');
    });
  });

  describe('percentage()', () => {
    test('yüzde: 50/100 = 50', () => {
      expect(percentage(50, 100)).toBe(50);
    });
    test('yüzde: sıfır toplam = 0', () => {
      expect(percentage(10, 0)).toBe(0);
    });
  });
});
