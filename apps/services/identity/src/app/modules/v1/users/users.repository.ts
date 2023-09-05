import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MongoBaseRepository } from '@property-finder/services/repositories';
import { User } from './models/user.schema';

@Injectable()
export class UsersRepository extends MongoBaseRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection
  ) {
    super(userModel, connection);
  }
}
