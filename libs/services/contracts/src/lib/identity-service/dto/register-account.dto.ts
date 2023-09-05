import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  // IsStrongPassword,
} from 'class-validator';

export class RegisterAccountDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public email: string;

  @IsDefined()
  @IsNotEmpty()
  // TODO: @IsStrongPassword()
  public password: string;

  @IsDefined()
  @IsNotEmpty()
  // TODO: Create a @Match('password') decorator
  public confirmPassword: string;

  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public nickname: string;
}
