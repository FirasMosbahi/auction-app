import { User } from '@app/common/database/user.schema';
import { Item } from '@app/common/database/item.schema';

export class BidDto {
  bidder: User;
  item: Item;
  price: number;
  timestamp: Date;
}
