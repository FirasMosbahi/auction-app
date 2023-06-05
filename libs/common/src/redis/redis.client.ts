// redis.client.ts
import { Injectable } from '@nestjs/common';
import { ClientProxy, RedisOptions, Transport } from '@nestjs/microservices';
import { ClientOptions, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class RedisClient {
  private readonly client: ClientProxy;

  constructor() {
    const redisOptions: RedisOptions = {
      transport: Transport.REDIS,
      options: {
        host: 'redis://localhost',
        port: 6379,
      },
    };

    const clientOptions: ClientOptions = {
      transport: redisOptions.transport,
      options: redisOptions.options,
    };

    this.client = ClientProxyFactory.create(clientOptions);
  }

  getClient(): ClientProxy {
    return this.client;
  }
}
