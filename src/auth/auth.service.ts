import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { CONSTATNS } from '@/common/definition';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<any, {}>,
  ) {}

  create(user: any) {
    return this.userModel.create(user);
  }

  findOne(githubId: string) {
    return this.userModel.findOne({ githubId });
  }

  async login(user: any) {
    if (user) {
      return await jwt.sign(user, CONSTATNS.SECRET_KEY);
    }
    return null;
  }
}
