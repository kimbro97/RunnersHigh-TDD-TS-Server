import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtToken } from '../functions/jwt.option';
import { MulterS3 } from '../functions/multer.option';
import { PostRepository } from '../repository/post.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository])
  ],
  controllers: [PostsController],
  providers: [PostsService, JwtToken, MulterS3]
})
export class PostsModule {}
