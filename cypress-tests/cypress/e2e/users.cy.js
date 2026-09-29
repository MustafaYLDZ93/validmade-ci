describe('Users API', () => {
  it('tüm kullanıcıları listeler', () => {
    cy.request('GET', '/users').then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length(10);
    });
  });

  it('tek kullanıcı getirir', () => {
    cy.request('GET', '/users/1').then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('name').that.is.a('string');
      expect(res.body).to.have.property('email').that.includes('@');
    });
  });

  it('kullanıcı adres bilgisi içerir', () => {
    cy.request('GET', '/users/1').then(res => {
      expect(res.body).to.have.property('address');
      expect(res.body.address).to.have.property('city');
      expect(res.body.address).to.have.property('zipcode');
    });
  });

  it('kullanıcı şirket bilgisi içerir', () => {
    cy.request('GET', '/users/1').then(res => {
      expect(res.body).to.have.property('company');
      expect(res.body.company).to.have.property('name');
    });
  });

  it('var olmayan kullanıcı 404 döner', () => {
    cy.request({ url: '/users/9999', failOnStatusCode: false }).then(res => {
      expect(res.status).to.eq(404);
    });
  });
});


describe('Todos API', () => {
  it('tüm todoları listeler', () => {
    cy.request('GET', '/todos').then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(200);
    });
  });

  it('tamamlanan todoları filtreler', () => {
    cy.request('GET', '/todos?completed=true').then(res => {
      expect(res.status).to.eq(200);
      res.body.forEach(todo => {
        expect(todo.completed).to.eq(true);
      });
    });
  });

  it('tek todo getirir', () => {
    cy.request('GET', '/todos/1').then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('title');
      expect(res.body).to.have.property('completed');
    });
  });
});
