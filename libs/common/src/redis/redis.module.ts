import { Module } from '@nestjs/common';
import { RedisClient } from './redis.client';

@Module({
  providers: [RedisClient],
  exports: [RedisClient],
})
export class RedisModule {}
