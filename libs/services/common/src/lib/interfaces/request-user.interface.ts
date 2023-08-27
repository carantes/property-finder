import { Request } from 'express';
import { UserAccountDto } from '../dto/identity/user-account.dto';

export interface RequestWithUser extends Request {
  user: UserAccountDto;
}
