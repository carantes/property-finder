import { Module } from '@nestjs/common';
import { identityServiceProvider } from './providers/identity-service.provider';
import { AccountsController } from './controllers/accounts.controller';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CookieService } from './services/cookie.service';
import { RefreshTokenService } from './services/refresh-token.service';

@Module({
  controllers: [AccountsController, AuthController],
  providers: [
    identityServiceProvider,
    JwtStrategy,
    CookieService,
    RefreshTokenService,
  ],
})
export class IdentityModule {}
