import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@songkeys/nestjs-redis';

@Injectable()
export class TokensRepository {
  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService
  ) {}

  public async setRefreshToken(userId: string, jwtId: string) {
    return await this.redisService.getClient().set(
      `refresh-token:${userId}:${jwtId}`,
      userId,
      'EX',
      this.configService.get('REFRESH_TOKEN_REDIS_EXP_IN_SEC') // 30 days
    );
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
