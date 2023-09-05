import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  AccountDetailsDto,
  RegisterAccountDto,
} from '@property-finder/services/contracts';
import { UsersService } from '../users/users.service';
import { HashingUtils } from '@property-finder/services/utils';
import { UserDto } from '../users/dto/user.dto';

export interface IAccountsService {
  signUp(registration: RegisterAccountDto): Promise<AccountDetailsDto>;
}

@Injectable()
export class AccountsService implements IAccountsService {
  constructor(private readonly usersService: UsersService) {}

  private async validateCreateUser(email: string) {
    let user: UserDto;

    try {
      user = await this.usersService.findOne('email', email);
    } catch (_) {
      // fail silently
    }

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  public async signUp(
    registration: RegisterAccountDto
  ): Promise<AccountDetailsDto> {
    await this.validateCreateUser(registration.email);

    const newUser = await this.usersService.create({
      ...registration,
      password: HashingUtils.hash(registration.password),
    });

    return new AccountDetailsDto(newUser);
  }
}
