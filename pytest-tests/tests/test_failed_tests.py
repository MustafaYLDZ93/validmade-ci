"""@failed-tests — bilerek hatalı testler (parse doğrulaması için)"""


def test_failed_tests_addition_wrong_expectation():
    assert 2 + 2 == 99, "Beklenen 99, gerçek 4"


def test_failed_tests_string_length_wrong_expectation():
    assert len("hello") == 3, "Beklenen 3, gerçek 5"
