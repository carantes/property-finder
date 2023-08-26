import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { BaseRepository } from '@property-finder/services/common';
import { Account } from './accounts.schema';

@Injectable()
export class AccountsRepository extends BaseRepository<Account> {
  protected readonly logger = new Logger(AccountsRepository.name);

  constructor(
    @InjectModel(Account.name) accountModel: Model<Account>,
    @InjectConnection() connection: Connection
  ) {
    super(accountModel, connection);
  }
}
