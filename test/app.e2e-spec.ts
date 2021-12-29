import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { expect } from 'chai'

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
      expect(response.status).to.eql(200)
      expect(response.text).to.eql('Hello RunnersHigh!')
    });
  })
  
  describe('UsersController', () => {
    describe('(POST) /users/signup', () => {
      it("회원가입에 성공했을경우, '회원가입 성공' 메시지와 상태코드 200이 응답에 포함되어야 합니다", async () => {
        const fakeUser = {
          email: 'kimbro8@test.com',
          password: 'hp01300130',
          nickname: 'kimbro'
        }
        const response =  await request(app.getHttpServer()).post('/users/signup').send(fakeUser)
        expect(response.status).to.eql(201)
        expect(response.body.message).to.eql('회원가입 성공')
      }); 
      
      it("회원가입시 이메일이 중복되는경우, '이미 존재하는 이메일 입니다' 메시지와 상태코드 409가 응답에 포함되어야 합니다", async () => {
        const fakeUser = {
          email: 'kimbro@test.com',
          password: 'hp01300130',
          nickname: 'kimbro'
        }
        const response =  await request(app.getHttpServer()).post('/users/signup').send(fakeUser)
        expect(response.status).to.eql(409)
        expect(response.body).to.eql({message: '이미 존재하는 이메일 입니다' })
      })
      
      it("회원가입 시 모든 정보가 들어오지 않은경우, '이메일, 비밀번호, 닉네임 정보가 필요합니다' 메시지와 상태코드 422가 응답에 포함되어야 합니다", async () => {
        const fakeUser = {
          email: 'kimbro@test.com',
          password: 'hp01300130',
        }        

        const response =  await request(app.getHttpServer()).post('/users/signup').send(fakeUser)
        expect(response.status).to.eql(422)
        expect(response.body).to.eql({message: '이메일, 비밀번호, 닉네임 정보가 필요합니다' })
      })
    })


  })


});
