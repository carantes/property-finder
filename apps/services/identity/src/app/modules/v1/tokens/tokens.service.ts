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

    this.tokensRepository.setRefreshToken(payload.userId, jwtid);

    //TODO: Persist access token on redis service

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refreshTokens(
    refreshToken: string
  ): Promise<AuthenticatedUserDto> {
    const verifiedJWt = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('REFRESH_TOKEN_JWT_SECRET'),
    });

    if (!verifiedJWt) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { userId, displayName, jwtid } = verifiedJWt;

    // Verify token on redis service
    const refreshTokenRedis = this.tokensRepository.getRefreshToken(
      userId,
      jwtid
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
