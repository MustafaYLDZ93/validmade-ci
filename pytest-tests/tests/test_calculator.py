import pytest


def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b


def divide(a, b):
    if b == 0:
        raise ValueError("Division by zero")
    return a / b


def percentage(value, total):
    if total == 0:
        return 0
    return (value / total) * 100


class TestAdd:
    def test_positive_numbers(self):
        assert add(2, 3) == 5

    def test_with_negative(self):
        assert add(-1, 5) == 4

    def test_with_zero(self):
        assert add(0, 7) == 7

    def test_floats(self):
        assert abs(add(1.1, 2.2) - 3.3) < 1e-9


class TestSubtract:
    def test_basic(self):
        assert subtract(10, 3) == 7

    def test_negative_result(self):
        assert subtract(3, 10) == -7


class TestMultiply:
    def test_basic(self):
        assert multiply(4, 5) == 20

    def test_with_zero(self):
        assert multiply(99, 0) == 0

    def test_with_negative(self):
        assert multiply(-3, 4) == -12


class TestDivide:
    def test_basic(self):
        assert divide(10, 2) == 5

    def test_decimal_result(self):
        assert divide(7, 2) == 3.5

    def test_division_by_zero(self):
        with pytest.raises(ValueError, match="Division by zero"):
            divide(5, 0)


class TestPercentage:
    def test_basic(self):
        assert percentage(50, 100) == 50.0

    def test_zero_total(self):
        assert percentage(10, 0) == 0
