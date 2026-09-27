import pytest
import re


def capitalize(s):
    if not s:
        return ''
    return s[0].upper() + s[1:].lower()


def slugify(s):
    s = s.lower().strip()
    s = re.sub(r'\s+', '-', s)
    s = re.sub(r'[^\w-]', '', s)
    return s


def truncate(s, max_len):
    if len(s) <= max_len:
        return s
    return s[:max_len - 3] + '...'


def count_words(s):
    return len(s.strip().split())


def is_palindrome(s):
    clean = re.sub(r'[^a-z0-9]', '', s.lower())
    return clean == clean[::-1]


class TestCapitalize:
    def test_basic(self):
        assert capitalize('hello') == 'Hello'

    def test_empty(self):
        assert capitalize('') == ''

    def test_uppercase_input(self):
        assert capitalize('WORLD') == 'World'


class TestSlugify:
    def test_spaces_to_hyphens(self):
        assert slugify('Hello World') == 'hello-world'

    def test_special_chars(self):
        assert slugify('Hello, World!') == 'hello-world'


class TestTruncate:
    def test_short_string(self):
        assert truncate('Hi', 10) == 'Hi'

    def test_long_string(self):
        assert truncate('Hello World', 8) == 'Hello...'

    def test_exact_length(self):
        assert truncate('Hello', 5) == 'Hello'


class TestCountWords:
    def test_two_words(self):
        assert count_words('hello world') == 2

    def test_single_word(self):
        assert count_words('word') == 1


class TestIsPalindrome:
    def test_simple_palindrome(self):
        assert is_palindrome('racecar') is True

    def test_not_palindrome(self):
        assert is_palindrome('hello') is False

    def test_case_insensitive(self):
        assert is_palindrome('Madam') is True

    def test_with_punctuation(self):
        assert is_palindrome('A man, a plan, a canal: Panama') is True
