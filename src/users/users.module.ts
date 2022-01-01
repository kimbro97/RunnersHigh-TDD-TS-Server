import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterS3 } from '../functions/multer.option';
import { JwtToken } from '../functions/jwt.option';
import { UserRepository } from '../repository/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtToken, MulterS3]
})
export class UsersModule {}
