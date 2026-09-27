/**
 * Ani Yük Testi (Spike Test)
 * Amaç: Ani ve beklenmedik trafik patlamalarına dayanıklılığı test et.
 * Senaryo: 1 VU'dan anında 20 VU'ya zıplar, sonra tekrar düşer.
 */
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s',  target: 1  },  // başlangıç
    { duration: '2s',  target: 20 },  // ANİ SPIKE — hızlı artış
    { duration: '8s',  target: 20 },  // spike devam
    { duration: '2s',  target: 1  },  // ani düşüş
    { duration: '5s',  target: 1  },  // stabilizasyon
    { duration: '3s',  target: 0  },  // bitiş
  ],
  thresholds: {
    http_req_failed:   ['rate<0.15'],   // spike'da %15 hata toleransı
    http_req_duration: ['p(95)<8000'],  // ani yük altında p95 8s
  },
};

const BASE = 'https://jsonplaceholder.typicode.com';

export default function () {
  group('Spike > Anlık Trafik Patlaması', () => {
    const r1 = http.get(`${BASE}/posts`);
    check(r1, {
      'posts erişilebilir': (r) => r.status === 200,
    });

    const r2 = http.get(`${BASE}/posts/${Math.floor(Math.random() * 100) + 1}`);
    check(r2, {
      'random post 200': (r) => r.status === 200,
    });

    const r3 = http.get(`${BASE}/users/${Math.floor(Math.random() * 10) + 1}`);
    check(r3, {
      'random user 200': (r) => r.status === 200,
    });
  });

  sleep(0.1);
}

export function handleSummary(data) {
  return { 'spike_test-summary.json': JSON.stringify(data) };
}
