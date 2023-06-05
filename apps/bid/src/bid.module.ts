import { Module } from '@nestjs/common';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';

@Module({
  imports: [],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
