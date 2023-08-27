import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import {
  registerAccountCommand,
  RegistrationRequest,
  UserAccountDto,
} from '@property-finder/services/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern(registerAccountCommand)
  public async registerAccount(
    registration: RegistrationRequest
  ): Promise<UserAccountDto> {
    try {
      const account: UserAccountDto = await this.accountsService.register(
        registration
      );

      if (!account) {
        throw new BadRequestException('Failed to create user account');
      }

      return account;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
