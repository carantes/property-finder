import { ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AuthenticatedUserDto,
  IDENTITY_SERVICE_TOKEN,
  refreshTokenCommand,
  UserInfoDto,
} from '@property-finder/services/contracts';
import { catchError, throwError, tap, map, firstValueFrom } from 'rxjs';

import { CookieService } from './cookie.service';

@Injectable()
export class RefreshTokenService {
  private readonly logger = new Logger(RefreshTokenService.name);

  constructor(
    @Inject(IDENTITY_SERVICE_TOKEN) private identityServiceClient: ClientProxy,
    private readonly cookieService: CookieService
  ) {}

  public async updateAccessToken(
    refreshToken: string,
    context: ExecutionContext
  ): Promise<UserInfoDto> {
    return await firstValueFrom(
      this.identityServiceClient
        .send<AuthenticatedUserDto>(refreshTokenCommand, refreshToken)
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response))
          )
        )
        .pipe(
          tap(({ tokens }) => {
            this.logger.debug('Update accessToken in the cookie');
            this.cookieService.setCookie(
              'access_token',
              tokens.accessToken,
              context
            );
          })
        )
        .pipe(map(({ userInfo }) => userInfo))
    );
  }
}
