import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { moduleFixture } from './app.test-module';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testingModule = await moduleFixture;
    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
