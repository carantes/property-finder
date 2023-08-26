import { Module } from '@nestjs/common';
import { AccountsController } from './accounts/accounts.controller';
import { AuthController } from './auth/auth.controller';
import { AccountsService } from './accounts/accounts.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './accounts/accounts.schema';
import { AccountsRepository } from './accounts/accounts.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://root:root123@mongodb:27017', {
      dbName: 'accounts',
    }),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountsController, AuthController],
  providers: [AccountsService, AccountsRepository, AuthService],
})
export class IdentityModule {}
