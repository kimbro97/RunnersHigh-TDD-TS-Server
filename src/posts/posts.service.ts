import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MulterS3 } from '../functions/multer.option';
import { CreatePostDto } from '../dto/create-post.dto';
import { JwtToken } from '../functions/jwt.option';
import { PostRepository } from '../repository/post.repository';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostRepository) private postRepository: PostRepository,
    private jwtToken: JwtToken,
    private multerS3: MulterS3) {}

    getAllPost() {
        return this.postRepository.getAllPost()
    }

    getUserPost(id: number, authorization: string) {
        const accessToken = this.jwtToken.isAuthorized(authorization)
        
        if (!accessToken) {
            throw new UnauthorizedException('유효하지 않은 토큰입니다')
        } else {
            return this.postRepository.getUserPost(id)
        }
    }

    async createPost(accessToken, file: Express.Multer.File, createPostDto: CreatePostDto) {
        if (!file) {
            const basicImage = 'https://runnershigh-1.s3.ap-northeast-2.amazonaws.com/1639037247869.jpg'
            return this.postRepository.createPost(accessToken, createPostDto, basicImage)
        } else {
            const multerImage = await this.multerS3.uploadImage('thumbnail_image', file)
            return this.postRepository.createPost(accessToken, createPostDto, multerImage)
        }
    }

    async deletePost(authorization: string, id: number) {
        const accessToken = this.jwtToken.isAuthorized(authorization)
        if (!accessToken) {
            throw new UnauthorizedException('유효하지 않은 토큰입니다')
        } else {
            return this.postRepository.deletePost(id)
        }
    }
}
