import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class MongoBaseDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.Date })
  _createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  _updatedAt: Date;
}
