import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  vus: 3,
  iterations: 18,
  thresholds: {
    http_req_failed:   ['rate<0.05'],
    http_req_duration: ['p(95)<4000'],
    'http_req_duration{group:::Posts API}': ['p(95)<3000'],
    'http_req_duration{group:::Users API}': ['p(95)<3000'],
    'http_req_duration{group:::Todos API}': ['p(95)<3000'],
  },
};

const BASE = 'https://jsonplaceholder.typicode.com';

export default function () {
  group('Posts API', () => {
    const listRes = http.get(`${BASE}/posts`);
    check(listRes, {
      'posts listesi 200': (r) => r.status === 200,
      'posts listesi 100 kayıt': (r) => JSON.parse(r.body).length === 100,
    });

    const postId = ((__ITER % 100) + 1);
    const singleRes = http.get(`${BASE}/posts/${postId}`);
    check(singleRes, {
      'tek post 200': (r) => r.status === 200,
      'tek post id doğru': (r) => JSON.parse(r.body).id === postId,
    });

    const createRes = http.post(
      `${BASE}/posts`,
      JSON.stringify({ title: 'k6 Test Post', body: 'k6 ile oluşturuldu', userId: 1 }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    check(createRes, {
      'post oluşturma 201': (r) => r.status === 201,
      'yeni post id var': (r) => JSON.parse(r.body).id > 0,
    });
  });

  sleep(0.5);

  group('Users API', () => {
    const usersRes = http.get(`${BASE}/users`);
    check(usersRes, {
      'users listesi 200': (r) => r.status === 200,
      'users listesi 10 kayıt': (r) => JSON.parse(r.body).length === 10,
    });

    const userId = ((__ITER % 10) + 1);
    const userRes = http.get(`${BASE}/users/${userId}`);
    check(userRes, {
      'tek user 200': (r) => r.status === 200,
      'user email alanı var': (r) => !!JSON.parse(r.body).email,
    });
  });

  sleep(0.5);

  group('Todos API', () => {
    const todosRes = http.get(`${BASE}/todos?userId=1`);
    check(todosRes, {
      'todos listesi 200': (r) => r.status === 200,
      'kullanıcı 1 için 20 todo': (r) => JSON.parse(r.body).length === 20,
    });

    const todoRes = http.get(`${BASE}/todos/1`);
    check(todoRes, {
      'tek todo 200': (r) => r.status === 200,
      'todo completed alanı boolean': (r) => typeof JSON.parse(r.body).completed === 'boolean',
    });
  });

  sleep(1);
}

export function handleSummary(data) {
  return { 'k6-summary.json': JSON.stringify(data) };
}
