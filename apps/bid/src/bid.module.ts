import { Module } from '@nestjs/common';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/auction')],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
