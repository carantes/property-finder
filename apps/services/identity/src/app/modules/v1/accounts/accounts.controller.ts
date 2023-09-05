import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { AccountsService } from './accounts.service';

import {
  AccountDetailsDto,
  RegisterAccountDto,
  registerUserCommand,
} from '@property-finder/services/contracts';

@Controller('auth')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern(registerUserCommand)
  public async registerUser(
    @Payload() registration: RegisterAccountDto
  ): Promise<AccountDetailsDto> {
    try {
      return await this.accountsService.signUp(registration);
    } catch (error) {
      console.log('controller error', error);
      throw new RpcException(error);
    }
  }
}
