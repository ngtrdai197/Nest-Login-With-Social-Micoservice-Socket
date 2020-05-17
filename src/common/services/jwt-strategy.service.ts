import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { AuthService } from '@/auth/auth.service';
import { CONSTATNS } from '../definition';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CONSTATNS.SECRET_KEY,
    });
  }

  async validate(validate: any) {
    console.log('validate', validate);
    return await this.authService.findOne(validate.githubId);
  }
}
