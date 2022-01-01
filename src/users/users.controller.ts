import { Body, Controller, Delete, Get, Headers, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { User } from '../entitys/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginDto } from '../dto/login-user.dto';
import { FileInterceptor} from '@nestjs/platform-express';
import { EditUserInfoDto } from '../dto/edit-user.dto';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.createUser(createUserDto)
    }
    
    @Delete('/userinfo')
    deleteUser(@Headers('authorization') authorization: String) {
        return this.usersService.deleteUser(authorization)
    }
    @Post('/login')
    logIn(@Body() loginDto: LoginDto): Promise<User> {
        return this.usersService.loginUser(loginDto)
    }

    @Post('/logout')
    logout(@Headers('authorization') authorization: string): Promise<void> {
        return this.usersService.logoutUser(authorization)
    }

    @Get('/userinfo')
    getUserInfo(@Headers('authorization') authorization: string): Promise<void> {
        return this.usersService.getUserInfo(authorization)
    }

    @Patch('/userinfo')
    @UseInterceptors(FileInterceptor('userimage'))
    editUserInfo(@Headers('authorization') authorization: string, @UploadedFile() file: Express.Multer.File, @Body() editUserDto: EditUserInfoDto) {
        return this.usersService.editUserInfo(authorization,file, editUserDto)
    }
}
