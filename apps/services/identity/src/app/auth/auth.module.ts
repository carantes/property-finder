import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensService } from './tokens.service';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { RefreshToken, RefreshTokenSchema } from './refresh-tokens.schema';
import { AccountsModule } from '../accounts/accounts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AccountsModule,
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokensService, RefreshTokensRepository],
})
export class AuthModule {}
