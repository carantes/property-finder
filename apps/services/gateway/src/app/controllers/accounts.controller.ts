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
  IDENTITY_SERVICE_TOKEN,
  RegistrationRequest,
  UserAccountDto,
  registerAccountCommand,
} from '@property-finder/services/common';
import { Observable, catchError, throwError } from 'rxjs';

@Controller('accounts')
export class AccountsController {
  constructor(
    @Inject(IDENTITY_SERVICE_TOKEN) private identityServiceClient: ClientProxy
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public registerAccount(
    @Body() registration: RegistrationRequest
  ): Observable<UserAccountDto> {
    return this.identityServiceClient
      .send(registerAccountCommand, registration)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }
}
