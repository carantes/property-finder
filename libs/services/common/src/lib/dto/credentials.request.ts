import { Transform, TransformFnParams } from 'class-transformer';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class CredentialsRequest {
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  public username: string;

  @IsDefined()
  @IsNotEmpty()
  public password: string;
}
