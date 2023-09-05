import { IBaseDto } from './base/dto-response.interface';

interface IAccountDetails extends IBaseDto {
  email: string;
  nickname: string;
}

export class AccountDetailsDto implements IAccountDetails {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  nickname: string;

  constructor(args: IAccountDetails) {
    Object.assign(this, {
      id: args.id,
      createdAt: args.createdAt,
      updatedAt: args.updatedAt,
      email: args.email,
      nickname: args.nickname,
    });
  }
}
