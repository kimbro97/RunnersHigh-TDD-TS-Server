import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "../entitys/user.entity";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { BadRequestException, ConflictException, HttpException, HttpStatus, UnprocessableEntityException } from "@nestjs/common";
import { LoginDto } from "../dto/login-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

   async createUser(createUserDto: CreateUserDto): Promise<void> {
      
      const { nickname , email, password } = createUserDto
      const userInfo = await this.findOne({ email })
      if (!nickname || !email || !password) {
        throw new UnprocessableEntityException({message: '이메일, 비밀번호, 닉네임 정보가 필요합니다'})
      }

      if (!userInfo) {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = this.create({
            nickname,
            email,
            password: hashedPassword,
            social_type: '일반',
            image_url: 'https://runnershigh-1.s3.ap-northeast-2.amazonaws.com/1639037178613.jpg'
        })

        await this.save(user)
        throw new HttpException('회원가입 성공', HttpStatus.CREATED)
      } else {
         throw new ConflictException({"message": '이미 존재하는 이메일 입니다'})
      }
  }

  async loginUser(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto

    if (!email || !password) {
      throw new UnprocessableEntityException({ message: '모든 정보가 필요합니다' })
    }

    const userInfo = await this.findOne({ email })
    const decryption = await bcrypt.compare(password, userInfo.password)

    if (!decryption) {
      throw new BadRequestException({ message: '로그인 정보가 일치하지 않습니다' })
    } else {
      return 
    }
  }
}