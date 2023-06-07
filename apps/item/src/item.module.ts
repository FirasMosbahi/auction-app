import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/common/database/database.module';
import { RedisModule } from '@app/common/redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'MONGODB_HOST',
        )}:${configService.get('MONGODB_PORT')}`,
      }),
    }),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_HOST: Joi.string().required(),
        MONGODB_PORT: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
      envFilePath: './apps/item/.env',
    }),
    RedisModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
