# ValidMade CI Test Suite

ValidMade CI platformu için örnek test projeleri. GitHub Actions ile otomatik koşulur ve JUnit XML artifact'ları yükler.

## İçerik

| Klasör | Framework | Rapor Formatı |
|--------|-----------|---------------|
| `jest-tests/` | Jest (JavaScript) | JUnit XML |
| `pytest-tests/` | pytest (Python) | JUnit XML |

## Nasıl Çalışır?

1. `main` branch'e push yapıldığında Actions otomatik tetiklenir
2. Her workflow testleri çalıştırır ve `junit.xml` üretir
3. Artifact `jest-junit-report` / `pytest-junit-report` olarak 90 gün saklanır
4. ValidMade CI'da "GitHub'dan Çek" → otomatik parse → JUnit raporu görünür

## Manuel Tetikleme

GitHub Actions sekmesinden "Run workflow" ile manuel de koşturulabilir.
