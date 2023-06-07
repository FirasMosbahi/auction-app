import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { BidModule } from './bid/bid.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
      envFilePath: './libs/common/.env',
    }),
    AuthModule,
    ItemModule,
    BidModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
