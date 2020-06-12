import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { Constants } from '@/common/definition';
import { UserService } from '@/user/user.service';
import { IUser } from '@/user/interface/user.interface';
import { CreateUserDto } from '@/user/dto/create-user.interface';
import { LoginDto, IValidation } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validate(validate: IValidation) {
    const user = await this.userService.findOne({
      username: validate.username,
    });
    if (!user) throw new UnauthorizedException('Unauthorized');
    return user;
  }

  async validateWithOAuth(validate: CreateUserDto): Promise<IUser> {
    const user = await this.userService.findOne({
      githubId: validate.githubId,
    });
    if (user) return user;
    return this.userService.create(validate);
  }

  async login(login: LoginDto) {
    const user = await this.userService.findOne({ username: login.username });
    if (!user)
      throw new HttpException(
        'User does not exist. Please check again!',
        HttpStatus.BAD_REQUEST,
      );

    return this.generateToken({ username: user.username });
  }

  private generateToken = (payload: IValidation) =>
    jwt.sign(payload, Constants.SECRET_KEY);
}
