import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RedisMessagesExchange {
  constructor(private readonly redisService: RedisService) {}

  async sendRequestMessage(queue: string, messageBody: any) {
    const requestId = uuidv4();
    const client = this.redisService.getClient();

    const responsePromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout waiting for response'));
      }, 10000);

      const onResponse = (channel: string, response: string) => {
        if (channel === requestId) {
          clearTimeout(timeout);
          client.unsubscribe(requestId);
          resolve(JSON.parse(response));
        }
      };

      client.subscribe(requestId, (err, count) => {
        if (err) {
          clearTimeout(timeout);
          reject(err);
        }
      });

      client.on('message', onResponse);
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
