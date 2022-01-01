import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { sign, verify } from "jsonwebtoken"

interface Token {
    id:number;
    email: string;
    nickname: string;
    image_url: string;
    social_type: string;
    createdAt: string;
    updatedAt: string;
    iat: number;
    exp: number;
}
@Injectable()
export class JwtToken {
  signAccessToken(data){
    return sign(Object.assign({}, data), process.env.ACCESS_TOKEN, { expiresIn: '24h' })
  }

  sendAccessToken(accessToken){
    throw new HttpException({data: { accessToken }, message: '로그인에 성공했습니다'}, HttpStatus.OK)
  }

  isAuthorized(accessToken){
    const authorization = accessToken
    if (!authorization) {
      return null
    }
    const token = authorization.split(' ')[1]
    try {
      return (verify(token, process.env.ACCESS_TOKEN)) as Token
    } catch (err) {
      return null
    }
  }
}
