import { NestFactory } from '@nestjs/core';
import { BidModule } from './bid.module';

async function bootstrap() {
  const app = await NestFactory.create(BidModule);
  await app.listen(3000);
}
bootstrap();
