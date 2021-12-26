import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('API 통합 테스트', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('AppModule test', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello RunnersHigh!');
    });
  })

  describe('UsersModule test', () => {
    test('/login (POST)', () => {
      return request(app.getHttpServer())
      .get('/users/login')
      .expect(200)
      .expect('Hello RunnersHigh!');
    })
  })

  describe('CahtsModule test', () => {
    
  })

  describe('PostsModule test', () => {
    
  })
});
