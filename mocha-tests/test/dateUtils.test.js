const { strict: assert } = require('assert');
const { formatDate, daysBetween, addDays, isWeekend, startOfMonth, endOfMonth, isSameDay, getQuarter } = require('../src/dateUtils');

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('tarihi YYYY-MM-DD formatına çevirir', () => {
      assert.equal(formatDate('2024-06-15'), '2024-06-15');
    });
    it('özel ayraç kullanır', () => {
      assert.equal(formatDate('2024-06-15', '/'), '2024/06/15');
    });
    it('tek haneli ay ve günü sıfırla doldurur', () => {
      assert.equal(formatDate('2024-01-05'), '2024-01-05');
    });
  });

  describe('daysBetween', () => {
    it('iki tarih arasındaki gün farkını hesaplar', () => {
      assert.equal(daysBetween('2024-01-01', '2024-01-11'), 10);
    });
    it('ters sırayla da çalışır', () => {
      assert.equal(daysBetween('2024-01-11', '2024-01-01'), 10);
    });
    it('aynı tarihte sıfır döner', () => {
      assert.equal(daysBetween('2024-06-01', '2024-06-01'), 0);
    });
  });

  describe('addDays', () => {
    it('belirtilen gün sayısını ekler', () => {
      const result = addDays('2024-01-01', 7);
      assert.equal(formatDate(result), '2024-01-08');
    });
    it('negatif gün çıkarır', () => {
      const result = addDays('2024-01-10', -3);
      assert.equal(formatDate(result), '2024-01-07');
    });
    it('ay geçişini doğru yapar', () => {
      const result = addDays('2024-01-30', 5);
      assert.equal(formatDate(result), '2024-02-04');
    });
  });

  describe('isWeekend', () => {
    it('Cumartesi hafta sonu sayılır', () => {
      assert.equal(isWeekend('2024-06-15'), true); // Cumartesi
    });
    it('Pazar hafta sonu sayılır', () => {
      assert.equal(isWeekend('2024-06-16'), true); // Pazar
    });
    it('Pazartesi hafta sonu sayılmaz', () => {
      assert.equal(isWeekend('2024-06-17'), false); // Pazartesi
    });
  });

  describe('startOfMonth / endOfMonth', () => {
    it('ayın ilk gününü döner', () => {
      assert.equal(formatDate(startOfMonth('2024-06-15')), '2024-06-01');
    });
    it('ayın son gününü döner', () => {
      assert.equal(formatDate(endOfMonth('2024-02-15')), '2024-02-29'); // 2024 artık yıl
    });
  });

  describe('isSameDay', () => {
    it('aynı günü doğru tanır', () => {
      assert.equal(isSameDay('2024-06-15', '2024-06-15'), true);
    });
    it('farklı günleri doğru tanır', () => {
      assert.equal(isSameDay('2024-06-15', '2024-06-16'), false);
    });
  });

  describe('getQuarter', () => {
    it('Q1 döner', () => assert.equal(getQuarter('2024-02-15'), 1));
    it('Q2 döner', () => assert.equal(getQuarter('2024-05-01'), 2));
    it('Q3 döner', () => assert.equal(getQuarter('2024-09-30'), 3));
    it('Q4 döner', () => assert.equal(getQuarter('2024-12-01'), 4));
  });
});
