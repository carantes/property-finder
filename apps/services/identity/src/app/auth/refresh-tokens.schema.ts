import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '@property-finder/services/common';

@Schema()
export class RefreshToken extends BaseDocument {
  @Prop({ required: true, unique: true })
  refreshToken: string;

  @Prop({ required: true, index: true })
  userId: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
