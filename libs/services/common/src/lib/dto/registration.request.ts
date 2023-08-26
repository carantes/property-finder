import { Transform, TransformFnParams } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationRequest {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public email: string;

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
}
