import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let client: ClientProxy;
  let authService: AuthService;

  beforeEach(async () => {
    authService = new AuthService(client);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
