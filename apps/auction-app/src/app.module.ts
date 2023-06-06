import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { BidModule } from './bid/bid.module';

@Module({
  imports: [AuthModule, ItemModule, BidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
