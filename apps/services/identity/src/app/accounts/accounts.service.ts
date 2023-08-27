import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  HashingUtils,
  RegistrationRequest,
  UserAccountDto,
  UserAccountDetailsDto,
} from '@property-finder/services/common';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  // Register a new user account
  public async register(
    registration: RegistrationRequest
  ): Promise<UserAccountDto> {
    if (await this.findUserAccountDetails(registration.email)) {
      throw new UnprocessableEntityException('Email already exists');
    }

    return new UserAccountDto(
      await this.accountsRepository.create({
        email: registration.email,
        name: registration.name,
        password: HashingUtils.hash(registration.password),
      })
    );
  }

  public async findUserAccountDetails(
    email: string
  ): Promise<UserAccountDetailsDto | null> {
    try {
      return new UserAccountDetailsDto(
        await this.accountsRepository.findOne({
          email,
        })
      );
    } catch (err) {
      /* fail silently */
    }
  }
}
