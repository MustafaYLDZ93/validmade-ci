const { test, expect } = require('@playwright/test');

test.describe('Albums API', () => {
  test('tüm albümleri listeler', async ({ request }) => {
    const res = await request.get('/albums');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(100);
  });

  test('tek albüm getirir', async ({ request }) => {
    const res = await request.get('/albums/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(typeof body.title).toBe('string');
  });

  test('kullanıcıya ait albümleri filtreler', async ({ request }) => {
    const res = await request.get('/albums?userId=1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    body.forEach(album => expect(album.userId).toBe(1));
  });
});

test.describe('Photos API', () => {
  test('albüme ait fotoğrafları listeler', async ({ request }) => {
    const res = await request.get('/photos?albumId=1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    body.forEach(photo => expect(photo.albumId).toBe(1));
  });

  test('fotoğraf thumbnail URL içerir', async ({ request }) => {
    const res = await request.get('/photos/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('thumbnailUrl');
    expect(body).toHaveProperty('url');
  });
});

test.describe('@failed-tests', () => {
  test('@failed-tests albüm sayısı yanlış beklenti', async ({ request }) => {
    const res = await request.get('/albums');
    const body = await res.json();
    expect(body).toHaveLength(5); // aslında 100 albüm var
  });
});
