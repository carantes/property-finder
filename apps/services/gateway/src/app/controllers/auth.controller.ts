import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AuthTokenPair,
  IDENTITY_SERVICE_TOKEN,
  RequestWithUser,
  signInCommand,
} from '@property-finder/services/common';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IDENTITY_SERVICE_TOKEN) private identityServiceClient: ClientProxy
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public signIn(
    @Request() request: RequestWithUser
  ): Observable<AuthTokenPair> {
    return this.identityServiceClient
      .send(signInCommand, request.user)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }
}
