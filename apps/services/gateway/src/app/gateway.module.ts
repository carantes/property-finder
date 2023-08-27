import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AccountsController } from './controllers/accounts.controller';
import { AuthController } from './controllers/auth.controller';
import { PropertiesController } from './controllers/properties.controller';
import {
  identityServiceProvider,
  propertyServiceProvider,
} from './gateway.providers';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [ConfigModule.forRoot(), PassportModule],
  controllers: [AccountsController, AuthController, PropertiesController],
  providers: [
    identityServiceProvider,
    propertyServiceProvider,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class GatewayModule {}
