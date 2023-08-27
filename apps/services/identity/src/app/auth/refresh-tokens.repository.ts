import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { BaseRepository } from '@property-finder/services/common';
import { RefreshToken } from './refresh-tokens.schema';

@Injectable()
export class RefreshTokensRepository extends BaseRepository<RefreshToken> {
  protected readonly logger = new Logger(RefreshTokensRepository.name);

  constructor(
    @InjectModel(RefreshToken.name) refreshTokenModel: Model<RefreshToken>,
    @InjectConnection() connection: Connection
  ) {
    super(refreshTokenModel, connection);
  }
}
