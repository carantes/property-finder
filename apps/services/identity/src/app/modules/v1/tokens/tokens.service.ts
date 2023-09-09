import { v4 as uuid } from 'uuid';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  AuthTokenPair,
  AuthenticatedUserDto,
} from '@property-finder/services/contracts';
import { TokensRepository } from './tokens.repository';

interface ITokensService {
  signInTokens(payload: AccessTokenPayload): Promise<AuthTokenPair>;
  refreshTokens(refreshToken: string): Promise<AuthenticatedUserDto>;
  deleteToken(refreshToken: string): Promise<number>;
}

@Injectable()
export class TokensService implements ITokensService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly tokensRepository: TokensRepository
  ) {}

  public async signInTokens(
    payload: AccessTokenPayload
  ): Promise<AuthTokenPair> {
    const jwtid = uuid();
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload, jwtid),
    ]);

    //TODO: Revoke old refresh token keys before add a new one
    this.tokensRepository.setRefreshToken(payload.userId, jwtid);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refreshTokens(
    refreshToken: string
  ): Promise<AuthenticatedUserDto> {
    const verifiedJwt = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('REFRESH_TOKEN_JWT_SECRET'),
    });

    if (!verifiedJwt) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { userId, displayName, jti } = verifiedJwt;

    // Verify token on redis service
    const refreshTokenRedis = await this.tokensRepository.getRefreshToken(
      userId,
      jti
    );

    if (!refreshTokenRedis) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const accessToken = await this.generateAccessToken({ userId, displayName });

    ///TODO: Persist access token on redis service

    return {
      userInfo: {
        userId,
        displayName,
      },
      tokens: { accessToken, refreshToken },
    };
  }

  public async deleteToken(refreshToken: string): Promise<number> {
    const verifiedJwt = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('REFRESH_TOKEN_JWT_SECRET'),
    });

    if (!verifiedJwt) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { userId, jti } = verifiedJwt;

    return this.tokensRepository.removeRefreshToken(userId, jti);
  }

  private async generateAccessToken(payload: AccessTokenPayload) {
    return await this.jwtService.signAsync(payload, {
      issuer: 'PropertyFinderApp',
      secret: this.configService.get<string>('ACCESS_TOKEN_JWT_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_JWT_EXPIRATION'),
    });
  }

  private async generateRefreshToken(
    payload: AccessTokenPayload,
    jwtid: string
  ) {
    return await this.jwtService.signAsync(payload, {
      jwtid,
      issuer: 'PropertyFinderApp',
      secret: this.configService.get<string>('REFRESH_TOKEN_JWT_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_JWT_EXPIRATION'),
    });
  }
}
