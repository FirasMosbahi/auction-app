import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from '@app/common/database/user.repository';
import { ItemRepository } from '@app/common/database/item.repository';
import { BidRepository } from '@app/common/database/bid.repository';
import { User, UserSchema } from '@app/common/database/user.schema';
import { Item, ItemSchema } from '@app/common/database/item.schema';
import { Bid, BidSchema } from '@app/common/database/bid.schema';
import * as Joi from 'joi';
//A module which provides interactions with mongodb database
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'MONGODB_HOST',
        )}:${configService.get('MONGODB_PORT')}`,
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Item.name, schema: ItemSchema },
      { name: Bid.name, schema: BidSchema },
    ]),
  ],
  providers: [UserRepository, ItemRepository, BidRepository],
  exports: [UserRepository, ItemRepository, BidRepository],
})
export class DatabaseModule {}
