import request from 'supertest';

const BASE_URL = 'http://localhost:8000';

describe('App E2E (black-box)', () => {
  let token: string;

  it('/users/signup → creates a user', async () => {
    const res = await request(BASE_URL)
      .post('/users/signup')
      .send({ userName: 'tester', password: '1234', instrument: 'Guitar' })
      .expect(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('/auth/login → returns token', async () => {
    const res = await request(BASE_URL)
      .post('/auth/login')
      .send({ userName: 'tester', password: '1234' })
      .expect(200);
    token = res.body.token;
    expect(token).toBeTruthy();
  });

  it('/songs/search → returns array with auth', async () => {
    const res = await request(BASE_URL)
      .get('/songs/search')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/songs/search → 401 without token', async () => {
    await request(BASE_URL).get('/songs/search').expect(401);
  });
});
