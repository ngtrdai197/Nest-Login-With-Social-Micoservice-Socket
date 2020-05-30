import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';

import { TypeOAuth, Constants } from '@/common/definition';
import { AuthService } from '@/auth/auth.service';
import { CreateUserDto } from '@/user/dto/create-user.interface';

@Injectable()
export class GithubStrategyService extends PassportStrategy(
  Strategy,
  TypeOAuth.GITHUB,
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: Constants.GITHUB.clientID,
      clientSecret: Constants.GITHUB.clientSecret,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: (err: any, user: any) => void,
  ) {
    const { id, username, profileUrl } = profile;
    let githubUser: any;
    /* eslint-disable @typescript-eslint/camelcase */
    if (profile._json) {
      const {
        _json: { avatar_url, created_at, updated_at, email },
      } = profile;
      githubUser = {
        githubId: id,
        username,
        profileUrl,
        avatar_url,
        created_at,
        updated_at,
        email,
        accessToken,
      };
      cb(null, githubUser);
    }
    cb(null, { id, username, profileUrl });
    const newUser: CreateUserDto = {
      username: githubUser.username,
      avatarUrl: githubUser.avatar_url,
      githubId: githubUser.id,
    };

    return this.authService.validateWithOAuth(newUser);
  }
}
