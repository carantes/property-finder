import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { HashingUtils } from '@property-finder/services/utils';

import {
  UserCredentialsDto,
  AuthenticatedUserDto,
} from '@property-finder/services/contracts';

import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';

export interface IAuthService {
  signIn(credentials: UserCredentialsDto): Promise<AuthenticatedUserDto>;
  refreshToken(token: string): Promise<AuthenticatedUserDto>;
  logout(token: string): Promise<void>;
}

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService
  ) {}

  private async validateUserCredentials(credentials: UserCredentialsDto) {
    try {
      // It will throw if user doesn't exists
      this.logger.debug('Search user by email', { email: credentials.email });
      const user = await this.usersService.findOne('email', credentials.email);

      this.logger.debug('Comparing user credentials');
      if (!HashingUtils.compare(credentials.password, user.password)) {
        // Password is invalid
        throw new UnauthorizedException('Invalid credentials');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  public async signIn(
    credentials: UserCredentialsDto
  ): Promise<AuthenticatedUserDto> {
    try {
      this.logger.debug('Validate user credentials');
      const user = await this.validateUserCredentials(credentials);

      this.logger.debug('Generating new auth tokens');
      const tokens = await this.tokensService.signInTokens({
        userId: user.id,
        displayName: user.nickname,
      });

      this.logger.debug('Returning user info', { id: user.id });
      return new AuthenticatedUserDto({
        userInfo: {
          userId: user.id,
          displayName: user.nickname,
        },
        tokens,
      });
    } catch (error) {
      throw new UnauthorizedException('Unable to sign-in the user');
    }
  }

  public async refreshToken(token: string): Promise<AuthenticatedUserDto> {
    try {
      this.logger.debug('Refreshing access token');
      return this.tokensService.refreshTokens(token);
    } catch (error) {
      throw new UnauthorizedException('Failed to refresh access token');
    }
  }

  public async logout(token: string): Promise<void> {
    try {
      this.logger.debug('Cleanup token from storage');
      await this.tokensService.deleteToken(token);
    } catch (error) {
      throw new UnauthorizedException('Failed to logout user');
    }
  }
}
