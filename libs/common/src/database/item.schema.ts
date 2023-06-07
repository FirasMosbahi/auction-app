import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';
@Schema()
export class Item extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startingPrice: number;

  @Prop({ required: true })
  actualPrice: number;

  @Prop({ required: true })
  published: boolean;

  @Prop({ required: true })
  closed: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Bid' })
  highestBid: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  owner: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ required: true })
  endTime: Date;
}
export const ItemSchema = SchemaFactory.createForClass(Item);
