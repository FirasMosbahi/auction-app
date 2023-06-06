import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { RedisModule } from '@app/common/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
