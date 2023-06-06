import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/common/database/database.module';
import { RedisModule } from '@app/common/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    DatabaseModule,
    RedisModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
