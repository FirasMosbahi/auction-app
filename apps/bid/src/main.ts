import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { BidModule } from './bid.module';

async function bootstrap() {
  const app = await NestFactory.create(BidModule);

  const configService = app.get(ConfigService);

  const microservice = await NestFactory.createMicroservice(BidModule, {
    transport: Transport.REDIS,
    options: {
      url: `redis://${configService.get('REDIS_HOST')}:${configService.get(
        'REDIS_PORT',
      )}`,
    },
  });

  console.log('microservice auth started');
  await microservice.listen();
}

bootstrap();
