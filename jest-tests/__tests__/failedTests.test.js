describe('@failed-tests', () => {
  it('@failed-tests toplama sonucu yanlış beklenti', () => {
    expect(2 + 2).toBe(99);
  });

  it('@failed-tests string uzunluğu yanlış beklenti', () => {
    expect('hello'.length).toBe(3);
  });
});
