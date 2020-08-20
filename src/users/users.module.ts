import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
