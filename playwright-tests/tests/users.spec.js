const { test, expect } = require('@playwright/test');

test.describe('Users API', () => {
  test('tüm kullanıcıları listeler', async ({ request }) => {
    const res = await request.get('/users');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(10);
  });

  test('tek kullanıcı getirir', async ({ request }) => {
    const res = await request.get('/users/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(typeof body.name).toBe('string');
    expect(body.email).toContain('@');
  });

  test('kullanıcı adres bilgisi içerir', async ({ request }) => {
    const res = await request.get('/users/1');
    const body = await res.json();
    expect(body).toHaveProperty('address');
    expect(body.address).toHaveProperty('city');
    expect(body.address).toHaveProperty('zipcode');
  });

  test('kullanıcı şirket bilgisi içerir', async ({ request }) => {
    const res = await request.get('/users/1');
    const body = await res.json();
    expect(body).toHaveProperty('company');
    expect(typeof body.company.name).toBe('string');
  });

  test('var olmayan kullanıcı 404 döner', async ({ request }) => {
    const res = await request.get('/users/9999');
    expect(res.status()).toBe(404);
  });
});

test.describe('Todos API', () => {
  test('tüm todoları listeler', async ({ request }) => {
    const res = await request.get('/todos');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(200);
  });

  test('tamamlanan todoları filtreler', async ({ request }) => {
    const res = await request.get('/todos?completed=true');
    expect(res.status()).toBe(200);
    const body = await res.json();
    body.forEach(todo => expect(todo.completed).toBe(true));
  });

  test('tek todo getirir', async ({ request }) => {
    const res = await request.get('/todos/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('title');
    expect(typeof body.completed).toBe('boolean');
  });
});
