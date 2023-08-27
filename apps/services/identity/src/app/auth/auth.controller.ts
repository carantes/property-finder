import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  AuthTokenPair,
  signInCommand,
  CredentialsRequest,
  validateCredentialsCommand,
  UserAccountDto,
} from '@property-finder/services/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Called by the Passport local strategy decorator
  @MessagePattern(validateCredentialsCommand)
  public async validateUserCredentials(
    credentials: CredentialsRequest
  ): Promise<UserAccountDto> {
    try {
      return await this.authService.validateUser(credentials);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // User credentials is already validated at this point
  @MessagePattern(signInCommand)
  public async signIn(userAccount: UserAccountDto): Promise<AuthTokenPair> {
    try {
      return await this.authService.signIn(userAccount);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
