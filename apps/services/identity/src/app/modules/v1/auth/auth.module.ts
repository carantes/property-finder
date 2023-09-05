import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingUtils } from '@property-finder/services/utils';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [UsersModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService, HashingUtils],
})
export class AuthModule {}
