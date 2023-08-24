import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsController } from './controllers/accounts.controller';
import { AuthController } from './controllers/auth.controller';
import { identityServiceProvider } from './gateway.providers';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AccountsController, AuthController],
  providers: [identityServiceProvider],
})
export class GatewayModule {}
