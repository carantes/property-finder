import { Injectable } from '@nestjs/common';
import {
  AccessTokenPayload,
  AuthTokenPair,
  CredentialsRequest,
  HashingUtils,
  UserAccountDto,
  UserAccountDetailsDto,
} from '@property-finder/services/common';
import { AccountsService } from '../accounts/accounts.service';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly tokensService: TokensService
  ) {}

  public async signIn(userAccount: UserAccountDto): Promise<AuthTokenPair> {
    const tokenPayload: AccessTokenPayload = {
      userId: userAccount.id,
    };

    return this.tokensService.signToken(tokenPayload);
  }

  public async validateUser(
    credentials: CredentialsRequest
  ): Promise<UserAccountDto | null> {
    const account: UserAccountDetailsDto =
      await this.accountsService.findUserAccountDetails(credentials.email);

    // Account does not exist
    if (!account) return null;

    // Password is invalid
    if (!HashingUtils.compare(credentials.password, account.password)) {
      return null;
    }

    return new UserAccountDto({
      _id: account.id,
      _createdAt: account.createdAt,
      _updatedAt: account.updatedAt,
      name: account.name,
      email: account.email,
    });
  }
}
