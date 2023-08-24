import { Transform, TransformFnParams } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationRequest {
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public username: string;

  @IsDefined()
  @IsNotEmpty()
  public password: string;

  @IsDefined()
  @IsNotEmpty()
  public confirmPassword: string;

  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public email: string;
}
