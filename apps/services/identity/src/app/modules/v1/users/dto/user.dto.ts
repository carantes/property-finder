import { User } from '../models/user.schema';

export class UserDto {
  id: string;
  email: string;
  password: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(args: User) {
    Object.assign(this, {
      id: args._id.toHexString(),
      email: args.email,
      password: args.password,
      nickname: args.nickname,
      createdAt: args._createdAt,
      updatedAt: args._updatedAt,
    });
  }
}
