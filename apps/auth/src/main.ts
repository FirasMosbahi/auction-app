import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
      // host: 'redis://localhost',
      // port: 6379,
    },
  });
  console.log('microservice auth started');
  await app.listen();
}
bootstrap();
