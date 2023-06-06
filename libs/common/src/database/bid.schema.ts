import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { User } from '@app/common/database/user.schema';
import { Item } from '@app/common/database/item.schema';
@Schema()
export class Bid extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  bidder: User;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Item', required: true })
  item: Item;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}
export const BidSchema = SchemaFactory.createForClass(Bid);
