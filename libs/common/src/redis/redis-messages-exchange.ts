import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

//An injectable class which allows sending messages to a specific queue using redis
@Injectable()
export class RedisMessagesExchange {
  private client;

  constructor(private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
    });
  }

  async sendRequestMessage(pattern: string, data: any) {
    const responsePromise = this.client.send(pattern, data).toPromise();

    return await responsePromise;
  }
}
