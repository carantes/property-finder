interface IUserInfo {
  userId: string;
  displayName: string;
}

export class UserInfoDto implements IUserInfo {
  userId: string;
  displayName: string;

  constructor(args: IUserInfo) {
    Object.assign(this, {
      userId: args.userId,
      displayName: args.displayName,
    });
  }
}
