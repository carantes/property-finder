import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  AuthTokenPair,
  signInCommand,
  CredentialsRequest,
} from '@property-finder/services/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(signInCommand)
  public async signIn(credentials: CredentialsRequest): Promise<AuthTokenPair> {
    try {
      return await this.authService.signIn(credentials);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
