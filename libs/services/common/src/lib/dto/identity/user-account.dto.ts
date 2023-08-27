import { BaseDto } from '../base.dto';

interface UserAccountDtoArgs {
  _id: string | object;
  _createdAt: Date;
  _updatedAt: Date;
  name: string;
  email: string;
}

export class UserAccountDto extends BaseDto {
  public name: string;
  public email: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(args: UserAccountDtoArgs) {
    super();

    Object.assign(this, {
      id: args._id.toString(),
      createdAt: args._createdAt,
      updatedAt: args._updatedAt,
      name: args.name,
      email: args.email,
    } satisfies UserAccountDto);
  }
}
