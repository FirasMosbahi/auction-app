import { Injectable } from '@nestjs/common';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';
import { BidDto } from '../dto/bid.dto';
import { SearchOptionDto } from '../dto/search.option.dto';
import { User } from '@app/common/database/user.schema';

@Injectable()
export class BidService {
  constructor(private readonly redisMessageExchange: RedisMessagesExchange) {}
  async placeBid(bidder: string, bidDto: BidDto) {
    return await this.redisMessageExchange.sendRequestMessage('create-bid', {
      item: bidDto.itemId,
      price: bidDto.price,
      bidder,
    });
  }
  async getBids(itemId: string, searchOptions: SearchOptionDto) {
    return await this.redisMessageExchange.sendRequestMessage(
      'search-item-bids',
      {
        itemId,
        searchOptions,
      },
    );
  }
  async getBid(bidId: string) {
    return await this.redisMessageExchange.sendRequestMessage(
      'search-bid',
      bidId,
    );
  }
}
