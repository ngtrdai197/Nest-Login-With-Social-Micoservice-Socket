import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthActionsService {
  stateLoginGithub(user: any) {
    return user
      ? 'Login with Github successfully ...'
      : 'Login with Github failed ...';
  }
}
