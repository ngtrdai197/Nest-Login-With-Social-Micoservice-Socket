import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import {
  SessionSerializer,
  JwtStrategyService,
  GithubStrategyService,
} from './services';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [PassportModule.register({ session: true }), AuthModule],
  providers: [GithubStrategyService, SessionSerializer, JwtStrategyService],
})
export class SharedModule {}
