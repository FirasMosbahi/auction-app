import { Injectable } from '@nestjs/common';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';
import { BidDto } from '../dto/bid.dto';
import { SearchOptionDto } from '../dto/search.option.dto';
import { User } from '@app/common/database/user.schema';

@Injectable()
export class BidService {
  constructor(private readonly redisMessageExchange: RedisMessagesExchange) {}
  async placeBid(bidder: User, bidDto: BidDto) {
    const item = await this.redisMessageExchange.sendRequestMessage(
      'get-item-details',
      bidDto.itemId,
    );
    return await this.redisMessageExchange.sendRequestMessage('create-bid', {
      item,
      price: bidDto.price,
      timestamp: Date.now(),
      bidder,
    });
  }
  async getBids(itemId: string, searchOptions: SearchOptionDto) {
    return await this.redisMessageExchange.sendRequestMessage('search-bids', {
      itemId,
      searchOptions,
    });
  }
  async getBid(bidId: string) {
    return await this.redisMessageExchange.sendRequestMessage(
      'search-bid',
      bidId,
    );
  }
}
