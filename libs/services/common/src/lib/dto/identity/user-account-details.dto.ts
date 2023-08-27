import { BaseDto } from '../base.dto';

interface UserAccountDetailsDtoArgs {
  _id: string | object;
  _createdAt: Date;
  _updatedAt: Date;
  name: string;
  email: string;
  password: string;
}

export class UserAccountDetailsDto extends BaseDto {
  public name: string;
  public email: string;
  public password: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(args: UserAccountDetailsDtoArgs) {
    super();

    Object.assign(this, {
      id: args._id.toString(),
      createdAt: args._createdAt,
      updatedAt: args._updatedAt,
      name: args.name,
      email: args.email,
      password: args.password,
    } satisfies UserAccountDetailsDto);
  }
}
