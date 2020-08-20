import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {}

  async create(email: string, password: string): Promise<User> {
    return await this.userModel.create({ email, password});
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async alreadyExists(email: string): Promise<boolean> {
    return this.userModel.exists({ email });
  }
}
