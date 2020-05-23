import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TypeOAuth } from '@/common/definition/oauth.enum';

@Injectable()
export class LinkedinAuthGuard extends AuthGuard(TypeOAuth.LINKED_IN) {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
