import { Module } from '@nestjs/common';
import { AccountsController } from './accounts/accounts.controller';
import { AuthController } from './auth/auth.controller';
import { AccountsService } from './accounts/accounts.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AccountsController, AuthController],
  providers: [AccountsService, AuthService],
})
export class IdentityModule {}
