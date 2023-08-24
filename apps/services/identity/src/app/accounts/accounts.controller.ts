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
  ): Promise<UserDto | null> {
    try {
      const result = await this.accountsService.register(registration);

      if (!result) {
        throw new BadRequestException('Failed to create user account');
      }

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
