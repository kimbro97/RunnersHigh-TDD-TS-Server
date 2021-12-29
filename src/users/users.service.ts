import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { LoginDto } from '../dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

     async createUser(createUserDto: CreateUserDto): Promise<void> {
      return this.userRepository.createUser(createUserDto)
    }

    async loginUser(loginDto: LoginDto): Promise<User> {
      return this.userRepository.loginUser(loginDto)
    }
}
