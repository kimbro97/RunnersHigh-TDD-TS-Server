import { HttpException, HttpStatus, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { LoginDto } from '../dto/login-user.dto';
import { JwtToken } from '../functions/jwt.option';
import { EditUserInfoDto } from 'src/dto/edit-user.dto';
import { MulterS3 } from '../functions/multer.option';
@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(UserRepository) private userRepository: UserRepository,
      private jwtToken: JwtToken,
      private multerS3: MulterS3) {}

     async createUser(createUserDto: CreateUserDto): Promise<void> {
      return this.userRepository.createUser(createUserDto)
    }

    async deleteUser(authorization: String) {
      const accessToken = this.jwtToken.isAuthorized(authorization)
      if (!accessToken) {
        throw new UnauthorizedException('유효하지 않은 토큰입니다')
      } else {
        this.userRepository.delete({id: accessToken.id})
        throw new HttpException({message: '회원탈퇴 성공했습니다'}, HttpStatus.OK)
      }
    }

    async loginUser(loginDto: LoginDto): Promise<User> {
      return this.userRepository.loginUser(loginDto, this.jwtToken)
    }

    async logoutUser(authorization: string): Promise<void> {
      const accessToken = this.jwtToken.isAuthorized(authorization)
      if (!accessToken) {
        throw new UnauthorizedException('유효하지 않은 토큰입니다')
      } else {
        throw new HttpException({message: '로그아웃에 성공했습니다'}, HttpStatus.OK)
      }
    }

    async getUserInfo(authorization: string): Promise<void>{
      const accessToken = this.jwtToken.isAuthorized(authorization)

      if (!accessToken) {
        throw new UnauthorizedException('유효하지 않은 토큰입니다')
      } else {
        delete accessToken.createdAt
        delete accessToken.updatedAt
        delete accessToken.iat
        delete accessToken.exp
        throw new HttpException({ data: { userInfo: accessToken }, message: '회원정보 조회에 성공했습니다' }, HttpStatus.OK)
      }
    }

    async editUserInfo(authorization: string ,file: Express.Multer.File, editUserDto: EditUserInfoDto) {
      const accessToken = this.jwtToken.isAuthorized(authorization)
      let userImageUrl
      if(file) {
        userImageUrl = await this.multerS3.uploadImage('user_image', file)
      }
      
      if (!accessToken) {
        throw new UnauthorizedException('유효하지 않은 토큰입니다')
      } 
      if (userImageUrl || Object.keys(editUserDto).length > 0) {
        return this.userRepository.editUserInfo(accessToken, userImageUrl, editUserDto)
      }else {
        throw new UnprocessableEntityException({message: '변경할 정보가 필요합니다'})
      }
     }
}
