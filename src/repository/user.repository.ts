import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "../entitys/user.entity";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
      console.log('repository',createUserDto)
      const { nickname , email, password } = createUserDto
      
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = this.create({
          nickname,
          email,
          password: hashedPassword,
          social_type: '일반',
          image_url: 'https://runnershigh-1.s3.ap-northeast-2.amazonaws.com/1639037178613.jpg'
      })

      await this.save(user)
      return user
  }
}