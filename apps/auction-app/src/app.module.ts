import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/auction'),
    ClientsModule.register([
      {
        name: 'ITEM_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis://localhost',
          port: 6379,
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis://localhost',
          port: 6379,
        },
      },
      {
        name: 'BID_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis://localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
