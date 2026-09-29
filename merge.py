import glob, re

suites = []
for xml_file in sorted(glob.glob('*-tests/reports/junit.xml')):
    with open(xml_file) as f:
        content = f.read()
    for s in re.findall(r'<testsuite\b[\s\S]*?</testsuite>', content):
        if re.search(r'\btests="0"', s) and '<testcase' not in s:
            continue
        suites.append(s)

total    = sum(int(m.group(1)) for s in suites for m in [re.search(r'\btests="(\d+)"',    s)] if m)
failures = sum(int(m.group(1)) for s in suites for m in [re.search(r'\bfailures="(\d+)"', s)] if m)

with open('junit-combined.xml', 'w') as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write(f'<testsuites tests="{total}" failures="{failures}">\n')
    for s in suites:
        f.write(s + '\n')
    f.write('</testsuites>\n')

print(f"Birlestirildi: {total} test, {failures} hata, {len(suites)} suite")