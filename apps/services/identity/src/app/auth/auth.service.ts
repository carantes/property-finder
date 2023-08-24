import { Injectable } from '@nestjs/common';
import {
  AuthTokenPair,
  CredentialsRequest,
} from '@property-finder/services/common';

@Injectable()
export class AuthService {
  public async signIn(credentials: CredentialsRequest): Promise<AuthTokenPair> {
    return {
      accessToken: '1234',
      refreshToken: '1234',
    };
  }
}
