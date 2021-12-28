import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../src/configs/typeorm.config';

describe('ALL API TEST', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  

  describe('AppController', () => {
    it('(GET) /', async () => {
      const response =  await request(app.getHttpServer()).get('/')
      expect(response.status).toBe(200)
      expect(response.text).toBe('Hello RunnersHigh!')
    });
  })
  
  describe('UsersController', () => {
    it('(POST) /users/signup', async () => {
      const fakeUser = {
        email: 'kimbro@test.com',
        password: 'hp01300130',
        nickname: 'kimbro'
      }
      const response =  await request(app.getHttpServer()).post('/users/signup').send(fakeUser)
      expect(response.status).toBe(201)
    });
  })


});
