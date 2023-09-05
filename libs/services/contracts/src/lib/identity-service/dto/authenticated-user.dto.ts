import { AuthTokenPair } from '../interfaces/auth-token-pair.interface';
import { UserInfoDto } from './user-info.dto';

interface AuthenticatedUserDtoArgs {
  userInfo: UserInfoDto;
  tokens: AuthTokenPair;
}

export class AuthenticatedUserDto {
  public userInfo: UserInfoDto;
  public tokens: AuthTokenPair;

  constructor(args: AuthenticatedUserDtoArgs) {
    Object.assign(this, {
      userInfo: args.userInfo,
      tokens: args.tokens,
    });
  }
}
