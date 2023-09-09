import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { AuthService } from './auth.service';

import {
  signInCommand,
  UserCredentialsDto,
  AuthenticatedUserDto,
  getProfileCommand,
  refreshTokenCommand,
  AccountDetailsDto,
  logoutCommand,
} from '@property-finder/services/contracts';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @MessagePattern(signInCommand)
  public async signIn(
    @Payload() credentials: UserCredentialsDto
  ): Promise<AuthenticatedUserDto> {
    try {
      return await this.authService.signIn(credentials);
    } catch (error) {
      this.logger.error('Failed to sign-in user with credentials', error);
      throw new RpcException(error);
    }
  }

  @MessagePattern(getProfileCommand)
  public async me(@Payload() userId: string): Promise<AccountDetailsDto> {
    try {
      this.logger.debug('Get user info', userId);
      return new AccountDetailsDto(
        await this.userService.findOne('_id', userId)
      );
    } catch (error) {
      this.logger.error('Failed get user profile', error);
      throw new RpcException(error);
    }
  }

  @MessagePattern(refreshTokenCommand)
  public async refreshToken(
    @Payload() token: string
  ): Promise<AuthenticatedUserDto> {
    try {
      return await this.authService.refreshToken(token);
    } catch (error) {
      this.logger.error('Failed refresh access token', error);
      throw new RpcException(error);
    }
  }

  @MessagePattern(logoutCommand)
  public async logout(@Payload() token: string): Promise<string> {
    try {
      await this.authService.logout(token);
      return 'OK'; // prevent empty observables
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }
}
