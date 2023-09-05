import { Observable, catchError, throwError } from 'rxjs';
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
  registerUserCommand,
  RegisterAccountDto,
  AccountDetailsDto,
} from '@property-finder/services/contracts';

@Controller({
  path: 'accounts',
  version: '1',
})
export class AccountsController {
  constructor(
    @Inject(IDENTITY_SERVICE_TOKEN) private identityServiceClient: ClientProxy
  ) {}

  // Public
  @Post('register')
  @HttpCode(HttpStatus.OK)
  public registerAccount(
    @Body() registration: RegisterAccountDto
  ): Observable<AccountDetailsDto> {
    return this.identityServiceClient
      .send(registerUserCommand, registration)
      .pipe(
        catchError((error) => {
          return throwError(() => new RpcException(error.response));
        })
      );
  }
}
