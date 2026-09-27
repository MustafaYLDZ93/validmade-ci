/**
 * Yük Testi (Load Test)
 * Amaç: Beklenen normal üretim yükünü simüle et.
 * Senaryo: 5 VU eş zamanlı kullanıcı, 25 iterasyon — tam CRUD döngüsü.
 */
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  vus: 5,
  iterations: 25,
  thresholds: {
    http_req_failed:   ['rate<0.05'],   // %5'ten az hata
    http_req_duration: ['p(95)<3000'],  // %95 istek 3s altında
    'http_req_duration{group:::Load > Okuma}':  ['p(95)<2000'],
    'http_req_duration{group:::Load > Yazma}':  ['p(95)<4000'],
  },
};

const BASE = 'https://jsonplaceholder.typicode.com';

export default function () {
  group('Load > Okuma', () => {
    const listRes = http.get(`${BASE}/posts`);
    check(listRes, {
      'posts listesi 200':    (r) => r.status === 200,
      'posts listesi 100 kayıt': (r) => JSON.parse(r.body).length === 100,
    });

    const id = (__ITER % 100) + 1;
    const singleRes = http.get(`${BASE}/posts/${id}`);
    check(singleRes, {
      'tek post 200':   (r) => r.status === 200,
      'post id doğru':  (r) => JSON.parse(r.body).id === id,
    });

    const usersRes = http.get(`${BASE}/users`);
    check(usersRes, {
      'users 200':       (r) => r.status === 200,
      '10 kullanıcı':    (r) => JSON.parse(r.body).length === 10,
    });
  });

  sleep(0.5);

  group('Load > Yazma', () => {
    const createRes = http.post(
      `${BASE}/posts`,
      JSON.stringify({ title: 'Load Test Post', body: 'k6 yük testi', userId: 1 }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    check(createRes, {
      'post oluşturma 201': (r) => r.status === 201,
      'yeni post id > 0':   (r) => JSON.parse(r.body).id > 0,
    });

    const updateRes = http.put(
      `${BASE}/posts/1`,
      JSON.stringify({ id: 1, title: 'Güncellendi', body: 'Yük testi güncellemesi', userId: 1 }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    check(updateRes, {
      'put 200': (r) => r.status === 200,
    });
  });

  sleep(1);
}

export function handleSummary(data) {
  return { 'load_test-summary.json': JSON.stringify(data) };
}
