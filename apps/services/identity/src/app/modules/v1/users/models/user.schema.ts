import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoBaseDocument } from '@property-finder/services/repositories';

@Schema()
export class User extends MongoBaseDocument {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
