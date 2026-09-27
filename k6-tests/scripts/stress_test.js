/**
 * Stres Testi (Stress Test)
 * Amaç: Normal sınırın ötesine geç, kırılma noktasını bul.
 * Senaryo: Aşamalı ramp-up — 2 VU'dan 15 VU'ya çıkıp yavaş iner.
 */
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '8s',  target: 2  },  // ısınma
    { duration: '10s', target: 8  },  // normal yük
    { duration: '10s', target: 15 },  // stres yükü
    { duration: '8s',  target: 5  },  // yük azaltma
    { duration: '5s',  target: 0  },  // soğuma
  ],
  thresholds: {
    http_req_failed:   ['rate<0.10'],   // %10'dan az hata
    http_req_duration: ['p(95)<5000'],  // stres altında %95 5s altında
    http_req_duration: ['p(99)<8000'],  // %99 8s altında
  },
};

const BASE = 'https://jsonplaceholder.typicode.com';

export default function () {
  group('Stress > Yoğun Okuma', () => {
    const r1 = http.get(`${BASE}/posts`);
    check(r1, {
      'posts 200':     (r) => r.status === 200,
      'response var':  (r) => r.body.length > 0,
    });

    const r2 = http.get(`${BASE}/users`);
    check(r2, {
      'users 200': (r) => r.status === 200,
    });

    const r3 = http.get(`${BASE}/todos`);
    check(r3, {
      'todos 200':         (r) => r.status === 200,
      'todos 200 kayıt':   (r) => JSON.parse(r.body).length === 200,
    });
  });

  sleep(0.3);

  group('Stress > Eş Zamanlı Yazma', () => {
    const r = http.post(
      `${BASE}/posts`,
      JSON.stringify({ title: 'Stres Testi', body: 'Yüksek yük altında yazma', userId: 1 }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    check(r, {
      'yazma başarılı': (res) => res.status === 201,
    });
  });

  sleep(0.5);
}

export function handleSummary(data) {
  return { 'stress_test-summary.json': JSON.stringify(data) };
}
