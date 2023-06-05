import { Module } from '@nestjs/common';
import { RedisMessagesExchange } from './redis-messages-exchange';

@Module({
  providers: [RedisMessagesExchange],
  exports: [RedisMessagesExchange],
})
export class RedisModule {}
