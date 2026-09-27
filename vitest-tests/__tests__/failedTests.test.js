import { describe, it, expect } from 'vitest';

describe('@failed-tests', () => {
  it('@failed-tests çarpma sonucu yanlış beklenti', () => {
    expect(3 * 4).toBe(99);
  });

  it('@failed-tests dizi uzunluğu yanlış beklenti', () => {
    expect([1, 2, 3].length).toBe(10);
  });
});
