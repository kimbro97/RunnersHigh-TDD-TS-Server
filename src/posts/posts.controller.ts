import { Controller, Get, Post, Headers, Param, UseInterceptors, UploadedFile, Body, UnauthorizedException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtToken } from '../functions/jwt.option';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService, private jwtToken: JwtToken) {}

    @Get('/')
    getAllPost() {
        return this.postsService.getAllPost()
    }

    @Get('/:userid')
    getUserPost(@Param('userid') id: number, @Headers('authorization') authorization: string) {
        return this.postsService.getUserPost(id, authorization)
    }

    @Post('/')
    @UseInterceptors(FileInterceptor('postimage'))
    createPost(@Headers('authorization') authorization: string, @UploadedFile() file: Express.Multer.File, @Body() createPostDto: CreatePostDto) {
        const accessToken = this.jwtToken.isAuthorized(authorization)

        if (!accessToken) {
            throw new UnauthorizedException('유효하지 않은 토큰입니다')
        } else {
            return this.postsService.createPost(accessToken, file, createPostDto)
        }
    }
}
