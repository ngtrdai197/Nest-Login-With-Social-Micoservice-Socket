import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthService } from '@/auth/auth.service';
import { GithubAuthGuard } from '@/common/services';
import { CurrentUser } from '@/common/decorator/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async loginWithGithub(@Req() req: Request, @Res() resp: Response) {
    console.log('req.user', req.user);
    const token = await this.authService.login(req.user);
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
