/**
 * Duman Testi (Smoke Test)
 * Amaç: Sistemin en temel işlevselliğini doğrula. Minimum yük, hızlı sonuç.
 * Senaryo: 1 VU, 5 iterasyon — API'nin ayakta ve çalışır olduğunu kontrol eder.
 */
import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: {
    http_req_failed:   ['rate<0.01'],   // %1'den az hata
    http_req_duration: ['p(95)<3000'],  // %95 istek 3s altında
  },
};

const BASE = 'https://jsonplaceholder.typicode.com';

export default function () {
  group('Smoke > Posts', () => {
    const r = http.get(`${BASE}/posts/1`);
    check(r, {
      'status 200': (res) => res.status === 200,
      'id == 1':    (res) => JSON.parse(res.body).id === 1,
      'title var':  (res) => !!JSON.parse(res.body).title,
    });
  });

  group('Smoke > Users', () => {
    const r = http.get(`${BASE}/users/1`);
    check(r, {
      'status 200':  (res) => res.status === 200,
      'email var':   (res) => !!JSON.parse(res.body).email,
    });
  });

  group('Smoke > Todos', () => {
    const r = http.get(`${BASE}/todos/1`);
    check(r, {
      'status 200':      (res) => res.status === 200,
      'completed boolean': (res) => typeof JSON.parse(res.body).completed === 'boolean',
    });
  });
}

export function handleSummary(data) {
  return { 'smoke_test-summary.json': JSON.stringify(data) };
}
