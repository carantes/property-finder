import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  HashingUtils,
  RegistrationRequest,
} from '@property-finder/services/common';
import { AccountsRepository } from './accounts.repository';
import { Account } from './accounts.schema';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  // Register a new user account
  public async register(registration: RegistrationRequest): Promise<Account> {
    if (await this.findUserAccount(registration.email)) {
      throw new UnprocessableEntityException('Email already exists');
    }

    return await this.accountsRepository.create({
      ...registration,
      password: HashingUtils.hash(registration.password),
    });
  }

  public async findUserAccount(email: string): Promise<Account | null> {
    try {
      return await this.accountsRepository.findOne({
        email,
      });
    } catch (err) {
      /* fail silently */
    }
  }
}
