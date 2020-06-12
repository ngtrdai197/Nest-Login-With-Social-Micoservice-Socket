import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from './interface/user.interface';
import { USER_MODEL } from '@/common/definition/mongoose-constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<IUser, {}>,
  ) {}

  async create(user: any) {
    return this.userModel.create(user);
  }

  async findOne(conditions: { [key: string]: any }) {
    return this.userModel.findOne(conditions);
  }

  async findAll() {
    return this.userModel.find();
  }
}
