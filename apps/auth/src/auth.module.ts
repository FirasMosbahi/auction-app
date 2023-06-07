import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@app/common/database/database.module';
import { RedisModule } from '@app/common/redis/redis.module';
import { User, UserSchema } from '@app/common/database/user.schema';
import {ConfigModule, ConfigService} from '@nestjs/config';
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
    //MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'lovester-auction-app-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_HOST: Joi.string().required(),
        MONGODB_PORT: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    DatabaseModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
