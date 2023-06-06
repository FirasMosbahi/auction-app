import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from '@app/common/database/user.repository';
import { ItemRepository } from '@app/common/database/item.repository';
import { BidRepository } from '@app/common/database/bid.repository';
import { User, UserSchema } from '@app/common/database/user.schema';
import { Item, ItemSchema } from '@app/common/database/item.schema';
import { Bid, BidSchema } from '@app/common/database/bid.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Item.name, schema: ItemSchema },
      { name: Bid.name, schema: BidSchema },
    ]),
  ],
  providers: [UserRepository, ItemRepository, BidRepository],
  exports: [UserRepository, ItemRepository, BidRepository],
})
export class DatabaseModule {}
