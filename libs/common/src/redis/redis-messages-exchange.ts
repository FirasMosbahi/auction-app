import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { v4 } from 'uuid';

@Injectable()
export class RedisMessagesExchange {
  constructor(private readonly redisService: RedisService) {}

  async sendRequestMessage(queue: string, messageBody: any) {
    const requestId = v4();

    const client = this.redisService.getClient();

    const responsePromise = new Promise((resolve, reject) => {
      const subscriber = client.subscribe(requestId, (err, count) => {
        if (err) {
          reject(err);
        }
      });

      subscriber.on('message', (channel, response) => {
        resolve(JSON.parse(response));
      });

      setTimeout(() => {
        reject(new Error('Timeout waiting for response'));
      }, 10000);
    });

    await client.publish(
      queue,
      JSON.stringify({ requestId, body: messageBody }),
    );

    const response = await responsePromise;

    return { response };
  }
  async sendResponseMessage(requestId: string, response: any) {
    const client = this.redisService.getClient();
    await client.publish(requestId, JSON.stringify(response));
  }
}
