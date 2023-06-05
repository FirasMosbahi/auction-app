import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { User } from '@app/common/database/user.schema';
@Schema()
export class Item extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startingPrice: number;

  @Prop({ required: true })
  published: boolean;

  @Prop({ required: true })
  draft: boolean;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
  bidders: User[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  highestBidder: User;

  @Prop({ required: true })
  endTime: Date;
}
