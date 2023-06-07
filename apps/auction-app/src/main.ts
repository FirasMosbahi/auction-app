import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
    },
  });

  await app.listen(3000);
}
bootstrap();
