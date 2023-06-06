import { NestFactory } from '@nestjs/core';
import { ItemModule } from './item.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ItemModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
      // host: 'redis://localhost',
      // port: 6379,
    },
  });
  console.log('microservice item started');
  await app.listen();
}
bootstrap();
