import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RedisMessagesExchange {
  private client;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'redis://localhost',
        port: 6379,
      },
    });
  }

  async sendRequestMessage(pattern: string, data: any) {
    const responsePromise = this.client.send(pattern, data).toPromise();

    return await responsePromise;
  }
}
