import { Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import {
  CredentialsRequest,
  IDENTITY_SERVICE_TOKEN,
  UserAccountDto,
  validateCredentialsCommand,
} from '@property-finder/services/common';
import { Strategy } from 'passport-local';
import { firstValueFrom } from 'rxjs';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IDENTITY_SERVICE_TOKEN) private identityServiceClient: ClientProxy
  ) {
    super({ usernameField: 'email' });
  }

  public async validate(
    email: string,
    password: string
  ): Promise<UserAccountDto> {
    const user = await firstValueFrom<UserAccountDto>(
      this.identityServiceClient.send(
        validateCredentialsCommand,
        new CredentialsRequest({ email, password })
      )
    );

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }
}
