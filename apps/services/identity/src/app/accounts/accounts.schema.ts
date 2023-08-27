import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '@property-finder/services/common';

@Schema()
export class Account extends BaseDocument {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  //TODO
  // isEmailConfirmed
  // isLockedOut
}

export const AccountSchema = SchemaFactory.createForClass(Account);
