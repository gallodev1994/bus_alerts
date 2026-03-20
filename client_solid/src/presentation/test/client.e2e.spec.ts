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
  });
});
