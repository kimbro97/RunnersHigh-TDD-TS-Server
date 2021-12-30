import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { LoginDto } from '../dto/login-user.dto';
import tokenFunctoin from '../functions/token'
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

     async createUser(createUserDto: CreateUserDto): Promise<void> {
      return this.userRepository.createUser(createUserDto)
    }

    async deleteUser(authorization: String) {
      const accessToken = tokenFunctoin.isAuthorized(authorization)
      if (!accessToken) {
        throw new UnauthorizedException('유효하지 않은 토큰입니다')
      } else {
        this.userRepository.delete({id: accessToken.id})
        throw new HttpException({message: '회원탈퇴 성공했습니다'}, HttpStatus.OK)
      }
    }

    async loginUser(loginDto: LoginDto): Promise<User> {
      return this.userRepository.loginUser(loginDto)
    }

    async logoutUser(authorization: string) {
      const accessToken = tokenFunctoin.isAuthorized(authorization)
      if (!accessToken) {
        throw new UnauthorizedException('유효하지 않은 토큰입니다')
      } else {
        throw new HttpException({message: '로그아웃에 성공했습니다'}, HttpStatus.OK)
      }
    }
}
