import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AuthTokenPair,
  CredentialsRequest,
  IDENTITY_SERVICE_TOKEN,
  signInCommand,
} from '@property-finder/services/common';
import { Observable, catchError, throwError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IDENTITY_SERVICE_TOKEN) private identityServiceClient: ClientProxy
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public signIn(
    @Body() credentials: CredentialsRequest
  ): Observable<AuthTokenPair> {
    return this.identityServiceClient
      .send(signInCommand, credentials)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }
}
