import { BaseDto } from './base.dto';

export class UserDto extends BaseDto {
  public name: string;
  public email: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(args: any) {
    super();
    Object.assign(this, {
      id: args?._id,
      createdAt: args?._createdAt,
      updatedAt: args?._updatedAt,
      name: args?.name,
      email: args?.email,
    } satisfies UserDto);
  }
}
