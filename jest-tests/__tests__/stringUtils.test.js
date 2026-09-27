const { capitalize, slugify, truncate, countWords, isPalindrome } = require('../src/stringUtils');

describe('StringUtils', () => {
  describe('capitalize()', () => {
    test('ilk harf büyük', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
    test('boş string', () => {
      expect(capitalize('')).toBe('');
    });
    test('zaten büyük harf ile başlayan', () => {
      expect(capitalize('WORLD')).toBe('World');
    });
  });

  describe('slugify()', () => {
    test('boşlukları tire ile değiştirir', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });
    test('özel karakterleri kaldırır', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });
    test('çok boşluk', () => {
      expect(slugify('  foo   bar  ')).toBe('foo-bar');
    });
  });

  describe('truncate()', () => {
    test('kısa metin: değişmez', () => {
      expect(truncate('Hi', 10)).toBe('Hi');
    });
    test('uzun metin: kısaltır', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });
    test('tam sınırda: değişmez', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });
  });

  describe('countWords()', () => {
    test('iki kelime', () => {
      expect(countWords('hello world')).toBe(2);
    });
    test('boşluklarla dolu', () => {
      expect(countWords('  foo   bar  baz  ')).toBe(3);
    });
    test('tek kelime', () => {
      expect(countWords('word')).toBe(1);
    });
  });

  describe('isPalindrome()', () => {
    test('palindrom: racecar', () => {
      expect(isPalindrome('racecar')).toBe(true);
    });
    test('büyük-küçük harf: Madam', () => {
      expect(isPalindrome('Madam')).toBe(true);
    });
    test('palindrom değil', () => {
      expect(isPalindrome('hello')).toBe(false);
    });
    test('noktalama işaretli: A man a plan a canal Panama', () => {
      expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    });
  });
});
