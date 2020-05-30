import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { AuthService } from '@/auth/auth.service';
import { Constants } from '../definition';
import { IValidation } from '@/auth/auth.dto';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Constants.SECRET_KEY,
    });
  }

  async validate(validate: IValidation) {
    console.log('validate', validate);
    return this.authService.validate(validate);
  }
}
