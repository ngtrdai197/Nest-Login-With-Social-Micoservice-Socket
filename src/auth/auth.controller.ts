import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthService } from '@/auth/auth.service';
import { GithubAuthGuard } from '@/common/services';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { LoginDto } from './auth.dto';
import { IUser } from '@/user/interface/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async loginWithGithub(
    @CurrentUser() currentUser: IUser,
    @Res() resp: Response,
  ) {
    const login: LoginDto = {
      username: currentUser.username,
      password: currentUser.password,
    };
    const token = await this.authService.login(login);
    return resp.redirect(`http://localhost:4200/profile?accessToken=${token}`);
  }

  @Get('linkedin/callback')
  @UseGuards(GithubAuthGuard)
  async loginWithLinkedin(
    @CurrentUser() currentUser: IUser,
    @Res() resp: Response,
  ) {
    const login: LoginDto = {
      username: currentUser.username,
      password: currentUser.password,
    };
    const token = await this.authService.login(login);
    return resp.redirect(`http://localhost:4200/profile?accessToken=${token}`);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req: Request, @CurrentUser() user: any) {
    console.log(`me request ...`);
    console.log('me', user);
    return user;
  }

  @Get('github/logout')
  async logOut(@Req() req: Request, @Res() resp: Response) {
    req.logout();
    console.log('req.user', req.user);
    return resp.status(200).jsonp({ message: 'Logout successfully ...' });
  }
}
