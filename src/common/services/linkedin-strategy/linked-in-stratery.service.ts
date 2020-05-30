import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';

import { TypeOAuth, Constants } from '@/common/definition';

@Injectable()
export class LinkedinStrategyService extends PassportStrategy(
  Strategy,
  TypeOAuth.LINKED_IN,
) {
  constructor() {
    super({
      clientID: Constants.LINKED_IN.clientID,
      clientSecret: Constants.LINKED_IN.clientSecret,
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_basicprofile'],
      state: true,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user: any) => void,
  ) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    return done(null, profile);
  }
}
