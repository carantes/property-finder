import { Observable, catchError, map, tap, throwError } from 'rxjs';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { Response } from 'express';

import {
  AuthenticatedUserDto,
  IDENTITY_SERVICE_TOKEN,
  UserCredentialsDto,
  signInCommand,
  getProfileCommand,
  logoutCommand,
  AccountDetailsDto,
  UserInfoDto,
} from '@property-finder/services/contracts';

import { JwtAuthGuard } from '../../../../guards/jwt-auth.guard';
import { CurrentUser } from '../../../../decorators/user.decorator';
import { CookieService } from '../services/cookie.service';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    @Inject(IDENTITY_SERVICE_TOKEN) private identityServiceClient: ClientProxy,
    private readonly cookieService: CookieService
  ) {}

  // Public
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public signIn(
    @Body() credentials: UserCredentialsDto,
    @Res({ passthrough: true }) res: Response
  ): Observable<UserInfoDto> {
    return this.identityServiceClient
      .send<AuthenticatedUserDto>(signInCommand, credentials)
      .pipe(
        catchError((error) => {
          return throwError(() => new RpcException(error.response));
        })
      )
      .pipe(
        tap(({ tokens }) => {
          this.cookieService.setCookie('access_token', tokens.accessToken, res);
          this.cookieService.setCookie(
            'refresh_token',
            tokens.refreshToken,
            res
          );
        })
      )
      .pipe(map(({ userInfo }) => userInfo));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  public me(
    @CurrentUser('userId') userId: string
  ): Observable<AccountDetailsDto> {
    return this.identityServiceClient
      .send<AccountDetailsDto, string>(getProfileCommand, userId)
      .pipe(
        catchError((error) => {
          return throwError(() => new RpcException(error.response));
        })
      );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public logout(@Res({ passthrough: true }) res: Response): Observable<void> {
    return this.identityServiceClient
      .send(logoutCommand, {})
      .pipe(
        catchError((error) => {
          return throwError(() => new RpcException(error.response));
        })
      )
      .pipe(
        tap(() => {
          this.cookieService.clearAllCookies(res);
        })
      );
  }
}
