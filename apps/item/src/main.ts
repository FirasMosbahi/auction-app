import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ItemModule } from './item.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemModule);

  const configService = app.get(ConfigService);

  const microservice = await NestFactory.createMicroservice(ItemModule, {
    transport: Transport.REDIS,
    options: {
      url: `redis://${configService.get('REDIS_HOST')}:${configService.get(
        'REDIS_PORT',
      )}`,
    },
  });

  console.log('microservice item started');
  await microservice.listen();
}

bootstrap();
