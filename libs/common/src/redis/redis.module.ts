import { Module } from '@nestjs/common';
import { RedisMessagesExchange } from './redis-messages-exchange';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_HOST: Joi.string().required(),
        MONGODB_PORT: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
      envFilePath: './libs/common/.env',
    }),
  ],
  providers: [RedisMessagesExchange],
  exports: [RedisMessagesExchange],
})
export class RedisModule {}
