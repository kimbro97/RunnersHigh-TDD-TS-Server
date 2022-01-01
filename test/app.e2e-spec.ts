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

    describe('(POST) /users/login', () => {
      it("로그인에 성공했을겨우, '로그인에 성공했습니다' 메시지와 상태코드 200, Token값이 응답에 포함되어야 합니다", async () => {
        const loginInfo = {
          email: 'kimbro@test.com',
          password: 'hp01300130'
        }

        const response = await request(app.getHttpServer()).post('/users/login').send(loginInfo)
        expect(response.status).to.eql(200)
        expect(response.body.message).to.eql('로그인에 성공했습니다')
        expect(response.body.data).to.have.keys('accessToken')
      })

      it("로그인시 모든 정보가 들어오지 않은경우, '모든 정보가 필요합니다' 메시지와 상태코드 422가 응답에 포함되어야 합니다", async () => {
        const loginInfo = {
          email: 'kimbro@test.com'
        }
        const response = await request(app.getHttpServer()).post('/users/login').send(loginInfo)
        expect(response.status).to.eql(422)
        expect(response.body.message).to.eql('모든 정보가 필요합니다')     
      })

      it("로그인시 로그인 정보가 일치하지 않은경우, '로그인 정보가 일치하지 않습니다' 메시지와 상태코드 400가 응답에 포함되어야 합니다", async () => {
        const loginInfo = {
          email: 'kimbro@test.com',
          password: 'hp12341234'
        }
        const response = await request(app.getHttpServer()).post('/users/login').send(loginInfo)
        expect(response.status).to.eql(400)
        expect(response.body.message).to.eql('로그인 정보가 일치하지 않습니다')     
      })
    })

    describe('(POST) /users/logout', () => {
      it("토큰값이 있고 로그아웃에 성공한경우, '로그아웃에 성공했습니다' 메시지와 상태코드 200이 응답에 포함되어야 합니다", async () => {
        const loginInfo = {
          email: 'kimbro@test.com',
          password: 'hp01300130'
        }
        const loginResponse = await request(app.getHttpServer()).post('/users/login').send(loginInfo)
        
        const logoutResponse =  await request(app.getHttpServer()).post('/users/logout').set('authorization', `Bearer ${loginResponse.body.data.accessToken}`)
        expect(logoutResponse.status).to.eql(200)
        expect(logoutResponse.body.message).to.eql('로그아웃에 성공했습니다')
      })

      it("토큰값이 없는경우, '유효하지 않은 토큰입니다' 메시지와 상태코드 401이 응답에 포함되어야 합니다", async () => {
        const logoutResponse =  await request(app.getHttpServer()).post('/users/logout')
        expect(logoutResponse.status).to.eql(401)
        expect(logoutResponse.body.message).to.eql('유효하지 않은 토큰입니다')        
      })
    })

    describe('(DELETE) /users/userinfo', () => {
      it("토큰값이 있고 회원탈퇴에 성공한경우, '회원탈퇴 성공했습니다' 메시지와 상태코드 200이 응답에 포함되어야 합니다", async () => {
        const loginInfo = {
          email: 'kimbro8@test.com',
          password: 'hp01300130'
        }
        const loginResponse = await request(app.getHttpServer()).post('/users/login').send(loginInfo)
        
        const logoutResponse =  await request(app.getHttpServer()).delete('/users/userinfo').set('authorization', `Bearer ${loginResponse.body.data.accessToken}`)
        expect(logoutResponse.status).to.eql(200)
        expect(logoutResponse.body.message).to.eql('회원탈퇴 성공했습니다')
      })

      it("토큰값이 없는경우, '유효하지 않은 토큰입니다' 메시지와 상태코드 401이 응답에 포함되어야 합니다", async () => {
        const logoutResponse =  await request(app.getHttpServer()).delete('/users/userinfo')
        expect(logoutResponse.status).to.eql(401)
        expect(logoutResponse.body.message).to.eql('유효하지 않은 토큰입니다')        
      })
    })

    describe('(GET) /users/userinfo', () => {
      it("토큰값이 있고 회원정보를 조회할경우, '회원정보 조회에 성공했습니다' 메시지와 상태코드 200이 응답에 포함되어야 합니다", async () => {
        const loginInfo = {
          email: 'kimbro@test.com',
          password: 'hp01300130'
        }
        const loginResponse = await request(app.getHttpServer()).post('/users/login').send(loginInfo)
        
        const logoutResponse =  await request(app.getHttpServer()).get('/users/userinfo').set('authorization', `Bearer ${loginResponse.body.data.accessToken}`)
        expect(logoutResponse.status).to.eql(200)
        expect(logoutResponse.body.message).to.eql('회원정보 조회에 성공했습니다')
        expect(logoutResponse.body.data.userInfo).to.eql({
          id: 5,
          email: "kimbro@test.com",
          nickname: "kimbro",
          image_url: "https://runnershigh-1.s3.ap-northeast-2.amazonaws.com/1639037178613.jpg",
          social_type: "일반"
        })
      })

      it("토큰값이 없는경우, '유효하지 않은 토큰입니다' 메시지와 상태코드 401이 응답에 포함되어야 합니다", async () => {
        const logoutResponse =  await request(app.getHttpServer()).get('/users/userinfo')
        expect(logoutResponse.status).to.eql(401)
        expect(logoutResponse.body.message).to.eql('유효하지 않은 토큰입니다')        
      })
    })
   
    describe('(PATCH) /users/userinfo', () => {
      it("토큰값이 있고 회원정보를 변경할경우, '닉네임, 비밀번호 또는 프로필 이미지 변경에 성공했습니다' 메시지와 상태코드 201이 응답에 포함되어야 합니다", async () => {
        const loginInfo = {
          email: 'kimbro@test.com',
          password: 'hp01300130'
        }
        const loginResponse = await request(app.getHttpServer()).post('/users/login').send(loginInfo)
        const editUserInfo = {
          password: 'hp01300130',
          nickname: 'kimbro',
          image_url: ''
        }
        const logoutResponse =  await request(app.getHttpServer()).patch('/users/userinfo').send(editUserInfo).set('authorization', `Bearer ${loginResponse.body.data.accessToken}`)
        expect(logoutResponse.status).to.eql(201)
        expect(logoutResponse.body.message).to.eql('닉네임, 비밀번호 또는 프로필 이미지 변경에 성공했습니다')
        expect(logoutResponse.body.data.userInfo).to.eql({
          id: 5,
          email: "kimbro@test.com",
          nickname: "kimbro",
          image_url: "https://runnershigh-1.s3.ap-northeast-2.amazonaws.com/1639037178613.jpg",
          social_type: "일반"
        })
      })

      it("토큰값이 없는경우, '유효하지 않은 토큰입니다' 메시지와 상태코드 401이 응답에 포함되어야 합니다", async () => {
        const logoutResponse =  await request(app.getHttpServer()).patch('/users/userinfo')
        expect(logoutResponse.status).to.eql(401)
        expect(logoutResponse.body.message).to.eql('유효하지 않은 토큰입니다')        
      })
    })    
  })
});
