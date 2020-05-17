/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';

import { CONSTATNS, TypeOAuth } from '@/common/definition';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class GithubStrategyService extends PassportStrategy(
  Strategy,
  TypeOAuth.GITHUB,
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: CONSTATNS.GITHUB.clientID,
      clientSecret: CONSTATNS.GITHUB.clientSecret,
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
    let user: any;
    if (profile._json) {
      const {
        _json: { avatar_url, created_at, updated_at, email },
      } = profile;
      user = {
        githubId: id,
        username,
        profileUrl,
        avatar_url,
        created_at,
        updated_at,
        email,
        accessToken,
      };
      cb(null, user);
    }
    cb(null, { id, username, profileUrl });
    const exist = await this.authService.findOne(id);
    if (!exist) {
      const newUser = await this.authService.create({
        username: user.username,
        avatar_url: user.avatar_url,
        githubId: user.id,
      });
      return newUser;
    }
    return exist;
  }
}
