import { Body, Controller, Headers, Post } from '@nestjs/common';
import { User } from '../entitys/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginDto } from '../dto/login-user.dto';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.createUser(createUserDto)
    }
    
    @Post('/signout')
    deleteUser(@Headers('authorization') authorization: String) {
        return this.usersService.deleteUser(authorization)
    }
    @Post('/login')
    logIn(@Body() loginDto: LoginDto): Promise<User> {
        return this.usersService.loginUser(loginDto)
    }

    @Post('/logout')
    logout(@Headers('authorization') authorization: string){
        return this.usersService.logoutUser(authorization)
    }
}
