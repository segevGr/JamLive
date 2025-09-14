import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App e2e basic checks', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /users → should return 401 when not authenticated', async () => {
    await request(app.getHttpServer()).get('/users').expect(401);
  });

  it('GET /some-random → should return 404 for unknown route', async () => {
    await request(app.getHttpServer()).get('/some-random').expect(404);
  });

  it('AppModule should be defined', async () => {
    expect(AppModule).toBeDefined();
  });

  it('Nest application should be initialized', async () => {
    expect(app).toBeDefined();
    expect(app.getHttpServer).toBeDefined();
  });

  it('GET /users → should return 401 and an error message', async () => {
    const res = await request(app.getHttpServer()).get('/users').expect(401);
    expect(res.body).toBeDefined();
  });
});
