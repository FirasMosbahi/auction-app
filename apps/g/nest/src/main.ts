import { NestFactory } from '@nestjs/core';
import { NestModule } from './nest.module';

async function bootstrap() {
  const app = await NestFactory.create(NestModule);
  await app.listen(3000);
}
bootstrap();
