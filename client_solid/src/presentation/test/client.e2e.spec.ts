import { ConsoleLogger } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('ClientController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('GET /clients', async () => {
    const res = await request(app.getHttpServer()).get('/clients').expect(200);
    
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('email');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('fetchDateTime');
  });

  it('GET /clients/id', async() => {
    const res = await request(app)
  });

});
