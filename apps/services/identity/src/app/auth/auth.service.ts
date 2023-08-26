import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AuthTokenPair,
  CredentialsRequest,
  HashingUtils,
} from '@property-finder/services/common';
import { AccountsService } from '../accounts/accounts.service';
import { Account } from '../accounts/accounts.schema';

@Injectable()
export class AuthService {
  constructor(private readonly accountsService: AccountsService) {}

  public async signIn(credentials: CredentialsRequest): Promise<AuthTokenPair> {
    const account = await this.validateCredentials(credentials);

    if (!account) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return {
      accessToken: '1234',
      refreshToken: '1234',
    };
  }

  private async validateCredentials(
    credentials: CredentialsRequest
  ): Promise<Account | null> {
    const account = await this.accountsService.findUserAccount(
      credentials.email
    );

    // User email is invalid
    if (!account) {
      return null;
    }

    // Password is invalid
    if (!HashingUtils.compare(credentials.password, account.password)) {
      return null;
    }

    return account;
  }
}
