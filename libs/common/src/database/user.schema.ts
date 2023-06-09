import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';
@Schema()
export class User extends AbstractDocument {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
