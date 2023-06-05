import { Injectable } from '@nestjs/common';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';
import { BidDto } from '../dto/bid.dto';
import { SearchOptionDto } from '../dto/search.option.dto';

@Injectable()
export class BidService {
  constructor(private readonly redisMessageExchange: RedisMessagesExchange) {}
  async placeBid(bidDto: BidDto) {
    return await this.redisMessageExchange.sendRequestMessage(
      'create-bid',
      bidDto,
    );
  }
  async getHighestBid(itemId: string) {
    return await this.redisMessageExchange.sendRequestMessage(
      'search-highest-bid',
      itemId,
    );
  }
  async getBids(itemId: string, searchOptions: SearchOptionDto) {
    return await this.redisMessageExchange.sendRequestMessage('search-bids', {
      itemId,
      searchOptions,
    });
  }
  async closeItem(itemId) {
    return await this.redisMessageExchange.sendRequestMessage('close-item', {
      itemId,
    });
  }
}
