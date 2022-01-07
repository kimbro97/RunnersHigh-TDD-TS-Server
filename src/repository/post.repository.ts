import { Post } from "../entitys/post.entity";
import { EntityRepository, Repository } from "typeorm";
import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "src/dto/create-post.dto";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    async getAllPost() {
        const posts = await this.find({
            relations: ['user']
        })
        throw new HttpException({ data: posts, message: '전체 게시물 조회에 성공했습니다' }, HttpStatus.OK)
    }

    async getUserPost(id: number) {
        const myPosts =  await this.find({
            where: {
                user: id
            },
            relations: ['user']
        })
        throw new HttpException({data: myPosts, message: '개별 게시물 조회에 성공했습니다'}, HttpStatus.OK)
    }

    async createPost(accessToken, createPostDto: CreatePostDto, file: string) {
        const post = await this.create({
            title: createPostDto.title,
            thumbnail_url: file,
            text: createPostDto.text,
            location: createPostDto.location,
            latitude: createPostDto.latitude,
            longitude: createPostDto.longitude,
            user: accessToken.id
        })
        await this.save(post)
        throw new HttpException({data: post, message: '게시물 작성에 성공했습니다'}, HttpStatus.CREATED)
    }

    async deletePost(id: number) {
        const chekedPost = await this.delete({id})
        
        if (chekedPost.affected === 0) {
            throw new NotFoundException('해당 게시물을 찾을 수 없습니다')
        } else {
            throw new HttpException({message: '게시물 삭제에 성공했습니다'}, HttpStatus.OK)
        }
    }
}