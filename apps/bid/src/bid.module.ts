import { Module } from '@nestjs/common';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/common/database/database.module';
import { RedisModule } from '@app/common/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    DatabaseModule,
    RedisModule,
  ],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
