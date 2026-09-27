describe('Posts API', () => {
  it('tüm postları listeler', () => {
    cy.request('GET', '/posts').then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length(100);
    });
  });

  it('tek post getirir', () => {
    cy.request('GET', '/posts/1').then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('title').that.is.a('string');
      expect(res.body).to.have.property('userId');
    });
  });

  it('yeni post oluşturur', () => {
    cy.request('POST', '/posts', {
      title: 'Test Başlığı',
      body: 'Test içeriği',
      userId: 1,
    }).then(res => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
      expect(res.body.title).to.eq('Test Başlığı');
    });
  });

  it('post günceller', () => {
    cy.request('PUT', '/posts/1', {
      id: 1,
      title: 'Güncellenmiş başlık',
      body: 'Güncellenmiş içerik',
      userId: 1,
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.title).to.eq('Güncellenmiş başlık');
    });
  });

  it('post siler', () => {
    cy.request('DELETE', '/posts/1').then(res => {
      expect(res.status).to.eq(200);
    });
  });

  it('kullanıcıya ait postları filtreler', () => {
    cy.request('GET', '/posts?userId=1').then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      res.body.forEach(post => {
        expect(post.userId).to.eq(1);
      });
    });
  });
});
