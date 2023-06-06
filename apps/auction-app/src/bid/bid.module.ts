import { Module } from '@nestjs/common';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';
import { RedisModule } from '@app/common/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
