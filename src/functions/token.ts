import { HttpException, HttpStatus } from "@nestjs/common"
import { sign, verify } from "jsonwebtoken"
import { TokenDto } from "../dto/jwt.dto"
export default {
    signAccessToken: (data) => {
        return sign(Object.assign({}, data), process.env.ACCESS_TOKEN, { expiresIn: '24h' })
      },
      sendAccessToken: (accessToken) => {
        throw new HttpException({data: { accessToken }, message: '로그인에 성공했습니다'}, HttpStatus.OK)
      },
      isAuthorized: (accessToken) => {
        const authorization = accessToken
        if (!authorization) {
          return null
        }
        const token = authorization.split(' ')[1]
        try {
          return (verify(token, process.env.ACCESS_TOKEN)) as TokenDto
        } catch (err) {
          return null
        }
      }
}