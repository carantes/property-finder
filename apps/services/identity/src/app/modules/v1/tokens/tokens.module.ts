import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokensRepository } from './tokens.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('ACCESS_TOKEN_JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('ACCESS_TOKEN_JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TokensService, TokensRepository],
  exports: [TokensService],
})
export class TokensModule {}
