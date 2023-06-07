import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);

  const microservice = await NestFactory.createMicroservice(AuthModule, {
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
