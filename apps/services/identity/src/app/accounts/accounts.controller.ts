import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import {
  registerAccountCommand,
  RegistrationRequest,
  UserDto,
} from '@property-finder/services/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern(registerAccountCommand)
  public async registerAccount(
    registration: RegistrationRequest
  ): Promise<UserDto> {
    try {
      const account = await this.accountsService.register(registration);

      if (!account) {
        throw new BadRequestException('Failed to create user account');
      }

      return new UserDto(account);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
