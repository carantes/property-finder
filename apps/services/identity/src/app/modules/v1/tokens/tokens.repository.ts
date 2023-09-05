import { Injectable } from '@nestjs/common';
import { RedisService } from '@songkeys/nestjs-redis';

@Injectable()
export class TokensRepository {
  constructor(private readonly redisService: RedisService) {}

  public async setRefreshToken(userId: string, jwtId: string) {
    return await this.redisService
      .getClient()
      .set(`refresh-token:${userId}:${jwtId}`, userId, 'EX', 60 * 60 * 24 * 30);
  }

  public async removeRefreshToken(userId: string, jwtId: string) {
    return await this.redisService
      .getClient()
      .del(`refresh-token:${userId}:${jwtId}`);
  }

  public async getRefreshToken(userId: string, jwtId: string) {
    return await this.redisService
      .getClient()
      .get(`refresh-token:${userId}:${jwtId}`);
  }
}
