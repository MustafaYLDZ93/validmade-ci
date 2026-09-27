function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}
function percentage(value, total) {
  if (total === 0) return 0;
  return (value / total) * 100;
}

module.exports = { add, subtract, multiply, divide, percentage };
