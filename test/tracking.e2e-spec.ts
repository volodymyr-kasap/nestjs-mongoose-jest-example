import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { moduleFixture } from './app.test-module';
import {
  Tracking,
} from './data';

import { TrackingResponseDto } from '$/tracking/dtos';
import { TrackingStatusEnum } from '$/common/enums';


describe('TrackingController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testingModule = await moduleFixture;
    app = testingModule.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/tracking (POST) Create tracking', () => {
    it('Create tracking success', async () => {
      const response = await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.validCreateRequest)
        .expect(HttpStatus.CREATED);

      const body: TrackingResponseDto = response.body;

      expect(body._id).toBeDefined();
      expect(body.status).toBe(TrackingStatusEnum.ACTIVE);
      expect(body.searchSettings).toBeDefined();
      expect(body.searchSettings.inChats).toBeDefined();
      expect(body.searchSettings.inChannels).toBeDefined();

      if (response?.body?._id) {
        await request(app.getHttpServer())
          .delete('/tracking/' + response.body._id)
          .expect(HttpStatus.NO_CONTENT);
      }
    });

    it('Create tracking long empty search str', async () => {
      const response = await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.longSpacesSearchStrCreateRequest)
        .expect(HttpStatus.CREATED);

      if (response?.body?._id) {
        await request(app.getHttpServer())
          .delete('/tracking/' + response.body._id)
          .expect(HttpStatus.NO_CONTENT);
      }
    });

    it('Create tracking non uniq', async () => {
      const nonUniqRequest = Tracking.nonUniqCreateRequest;
      nonUniqRequest.search = Date.now().toString();

      const response = await request(app.getHttpServer())
        .post('/tracking')
        .send(nonUniqRequest)
        .expect(HttpStatus.CREATED);

      await request(app.getHttpServer())
        .post('/tracking')
        .send(nonUniqRequest)
        .expect(HttpStatus.BAD_REQUEST);

      if (response?.body?._id) {
        await request(app.getHttpServer())
          .delete('/tracking/' + response.body._id)
          .expect(HttpStatus.NO_CONTENT);
      }
    });

    it('Create tracing empty', async () => {
      await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.emptyCreateRequest)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Create tracking empty search settings', async () => {
      await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.emptySearchSettingsCreateRequest)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Create tracking empty search str', async () => {
      await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.emptySearchStrCreateRequest)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Create tracking long search str', async () => {
      await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.longSearchStrCreateRequest)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Create tracking without settings', async () => {
      await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.createRequestWithoutSettings)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Create tracking without settings', async () => {
      await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.createRequestWithoutSettings)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Create tracking without search', async () => {
      await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.createRequestWithoutSearch)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/tracking/:id (GET) Get tracking', () => {
    it('Get one success', async () => {
      const { body: { _id } } = await request(app.getHttpServer())
        .post('/tracking')
        .send(Tracking.validCreateRequest)
        .expect(HttpStatus.CREATED);

      console.log(_id);

      const response = await request(app.getHttpServer())
        .get('/tracking/' + _id)
        .expect(HttpStatus.OK);

      const body: TrackingResponseDto = response.body;

      expect(body._id).toBeDefined();
      expect(body._id === _id).toBeTruthy();
      expect(Object.values(TrackingStatusEnum).includes(body.status)).toBeTruthy();
      expect(body.searchSettings).toBeDefined();
      expect(body.searchSettings.inChats).toBeDefined();
      expect(body.searchSettings.inChannels).toBeDefined();
      expect(body.createdAt).toBeDefined();

      await request(app.getHttpServer())
        .delete('/tracking/' + _id)
        .expect(HttpStatus.NO_CONTENT);
    });

    it('Get one unvalid id', () => {
      return request(app.getHttpServer())
        .get('/tracking/' + Tracking.unvalidObjectId)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Get one notFound', () => {
      return request(app.getHttpServer())
        .get('/tracking/' + Tracking.notFoundObjectId)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  // describe('/tracking/:id (PUT) Update tracking', () => {
  //   it('Get one unvalid id', () => {
  //     return request(app.getHttpServer())
  //       .get('/' + unvalidObjectId)
  //       .expect(HttpStatus.BAD_REQUEST);
  //   });
  // });

});

