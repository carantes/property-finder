export interface IBaseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class BaseDto implements IBaseDto {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;
}
