import { Injectable } from '@nestjs/common';
import { RegistrationRequest, UserDto } from '@property-finder/services/common';

@Injectable()
export class AccountsService {
  public async register(registration: RegistrationRequest) {
    return Promise.resolve({
      username: 'myusername',
      name: 'Random User',
      email: 'user@email.com',
    } as UserDto);
  }
}
