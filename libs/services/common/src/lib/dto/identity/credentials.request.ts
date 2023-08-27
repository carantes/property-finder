import { Transform, TransformFnParams } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class CredentialsRequest {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public email: string;

  @IsDefined()
  @IsNotEmpty()
  public password: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(args: any) {
    Object.assign(this, args);
  }
}
