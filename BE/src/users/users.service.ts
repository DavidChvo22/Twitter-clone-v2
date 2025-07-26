import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username });
  }

  async create(username: string, hashedPassword: string): Promise<User> {
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }
}
