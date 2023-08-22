import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './interfaces/user.interface';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  private async getUserByEmail(email: string) {
    return firstValueFrom(
      this.client
        .send<User>({ role: 'user', cmd: 'get-by-email' }, email)
        .pipe(timeout(5000))
    );
  }

  async signIn(email: string, password: string) {
    const user = await this.getUserByEmail(email);

    // if (!user || user.password !== password) {
    //   throw new UnauthorizedException();
    // }

    // TODO: Generate JWT Token and return it

    return user;
  }
}
