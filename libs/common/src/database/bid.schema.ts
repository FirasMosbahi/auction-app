import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';
@Schema()
export class Bid extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  bidder: mongoose.Schema.Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Item', required: true })
  item: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}
export const BidSchema = SchemaFactory.createForClass(Bid);
