import { BaseDto } from './base.dto';

export class UserDto extends BaseDto {
  public username: string;
  public name: string;
  public email: string;
}
