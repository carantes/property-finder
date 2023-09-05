import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { AccessTokenPayload } from '@property-finder/services/contracts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: JwtStrategy.extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_JWT_SECRET'),
    });
  }

  static extractJwtFromCookie(req: Request) {
    let token = null;

    if (req && req.cookies) {
      token = req.cookies['access_token'];
    }

    return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  }

  async validate(payload: AccessTokenPayload) {
    // TODO: call identity service to validate the access token
    return { userId: payload.userId };
  }
}
