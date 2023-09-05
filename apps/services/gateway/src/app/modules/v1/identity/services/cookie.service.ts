import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response, CookieOptions } from 'express';

type CookieName = 'refresh_token' | 'access_token';

export interface ICookieService {
  getCookie(name: CookieName, _req: Request | ExecutionContext): string;
  setCookie(
    name: CookieName,
    value: string,
    _res: Response | ExecutionContext
  ): void;
  clearAllCookies(_res: Response | ExecutionContext): void;
}

const EXPIRES_IN_1H = 1000 * 60 * 60 * 1;
const EXPIRES_IN_30D = 1000 * 60 * 60 * 24 * 30;
const Opts: Record<CookieName, CookieOptions> = {
  access_token: {
    maxAge: EXPIRES_IN_1H,
    httpOnly: true,
    sameSite: 'lax',
  },
  refresh_token: {
    maxAge: EXPIRES_IN_30D,
    httpOnly: true,
    sameSite: true,
  },
};

@Injectable()
export class CookieService implements ICookieService {
  private isExecutionContext(
    arg: Request | Response | ExecutionContext
  ): arg is ExecutionContext {
    return (<ExecutionContext>arg).switchToHttp !== undefined;
  }

  getCookie(name: CookieName, _req: Request | ExecutionContext): string {
    const req: Request = this.isExecutionContext(_req)
      ? _req.switchToHttp().getRequest()
      : _req;

    return req.cookies[name];
  }

  setCookie(
    name: CookieName,
    value: string,
    _res: Response | ExecutionContext
  ): void {
    const res: Response = this.isExecutionContext(_res)
      ? _res.switchToHttp().getResponse()
      : _res;

    res.cookie(name, value, Opts[name]);
  }

  clearAllCookies(_res: Response | ExecutionContext): void {
    const res: Response = this.isExecutionContext(_res)
      ? _res.switchToHttp().getResponse()
      : _res;

    res.clearCookie('refresh_token');
    res.clearCookie('access_token');
  }
}
