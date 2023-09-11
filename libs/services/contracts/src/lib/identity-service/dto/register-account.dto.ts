import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
import { IsEqualToProp } from '@property-finder/services/utils';

export class RegisterAccountDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEqualToProp('password', {
    message: 'Confirm Password is not equal to password',
  })
  public confirmPassword: string;

  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public nickname: string;
}
