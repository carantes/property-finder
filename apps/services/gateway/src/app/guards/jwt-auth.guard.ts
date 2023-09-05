import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenService } from '../modules/v1/identity/services/refresh-token.service';

import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly refreshTokenService: RefreshTokenService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (info) {
      const refreshToken = context.switchToHttp().getRequest<Request>().cookies[
        'refresh_token'
      ];

      if (
        info instanceof TokenExpiredError ||
        (info instanceof Error &&
          info.message === 'No auth token' &&
          refreshToken)
      ) {
        this.logger.debug('Auth token is expired, generating a new token');
        return this.refreshTokenService.updateAccessToken(
          refreshToken,
          context
        );
      }
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
