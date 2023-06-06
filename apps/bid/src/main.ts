import { NestFactory } from '@nestjs/core';
import { BidModule } from './bid.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(BidModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
      // host: 'redis://localhost',
      // port: 6379,
    },
  });
  console.log('microservice bid started');
  await app.listen();
}
bootstrap();
