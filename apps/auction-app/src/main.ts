import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });

    await app.startAllMicroservices();
    await app.listen(3000);
  }
}
bootstrap();
