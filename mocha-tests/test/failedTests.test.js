const { expect } = require('chai');

describe('@failed-tests', function () {
  it('@failed-tests çıkarma sonucu yanlış beklenti', function () {
    expect(10 - 3).to.equal(99);
  });

  it('@failed-tests boolean yanlış beklenti', function () {
    expect(true).to.equal(false);
  });
});
