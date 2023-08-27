import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

import {
  AccessTokenPayload,
  AuthTokenPair,
} from '@property-finder/services/common';
import { RpcException } from '@nestjs/microservices';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { RefreshToken } from './refresh-tokens.schema';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokensRepository
  ) {}

  public async signToken({
    userId,
  }: AccessTokenPayload): Promise<AuthTokenPair> {
    let existingRefreshToken: RefreshToken;

    try {
      // Check for existing tokens for this user
      existingRefreshToken = await this.refreshTokenRepository.findOne({
        userId,
      });
    } catch {
      // If token doesnt exist creat a new token
      existingRefreshToken = await this.refreshTokenRepository.create({
        userId,
        refreshToken: uuid(),
      });
    }

    return {
      accessToken: this.jwtService.sign({ userId }),
      refreshToken: existingRefreshToken.refreshToken,
    };
  }

  public async refreshToken(tokens: AuthTokenPair): Promise<AuthTokenPair> {
    // Check existing refreshtoken in the database
    let validRefreshToken: RefreshToken;

    try {
      validRefreshToken = await this.refreshTokenRepository.findOne({
        refreshToken: tokens.refreshToken,
      });
    } catch {
      throw new RpcException(
        new UnauthorizedException('Invalid refresh/access token')
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = this.jwtService.decode(tokens.accessToken);

    if (!decodedToken) {
      throw new RpcException(
        new UnauthorizedException('Invalid refresh/access token!')
      );
    }

    const { userId } = decodedToken;

    return {
      refreshToken: validRefreshToken.refreshToken,
      accessToken: this.jwtService.sign({ userId }),
    };
  }
}
