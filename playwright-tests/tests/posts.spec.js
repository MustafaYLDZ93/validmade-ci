const { test, expect } = require('@playwright/test');

test.describe('Posts API', () => {
  test('tüm postları listeler', async ({ request }) => {
    const res = await request.get('/posts');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(100);
  });

  test('tek post getirir', async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(typeof body.title).toBe('string');
    expect(typeof body.userId).toBe('number');
  });

  test('yeni post oluşturur', async ({ request }) => {
    const res = await request.post('/posts', {
      data: { title: 'Test Başlığı', body: 'Test içeriği', userId: 1 },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Test Başlığı');
  });

  test('post günceller', async ({ request }) => {
    const res = await request.put('/posts/1', {
      data: { id: 1, title: 'Güncellenmiş başlık', body: 'Güncellenmiş içerik', userId: 1 },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe('Güncellenmiş başlık');
  });

  test('post siler', async ({ request }) => {
    const res = await request.delete('/posts/1');
    expect(res.status()).toBe(200);
  });

  test('kullanıcıya ait postları filtreler', async ({ request }) => {
    const res = await request.get('/posts?userId=1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    body.forEach(post => expect(post.userId).toBe(1));
  });
});
