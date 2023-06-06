import { Injectable } from '@nestjs/common';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';
import { User } from '@app/common/database/user.schema';
import { ItemDto } from '../dto/item.dto';
import { UpdateItemDto } from '../dto/update.item.dto';
import { SearchOptionDto } from '../dto/search.option.dto';

@Injectable()
export class ItemService {
  constructor(private readonly redisMessageExchange: RedisMessagesExchange) {}
  async createItem(owner: User, itemDto: ItemDto) {
    return await this.redisMessageExchange.sendRequestMessage('create-item', {
      owner,
      ...itemDto,
      published: false,
      closed: false,
    });
  }
  async publishItem(itemId: string) {
    return await this.redisMessageExchange.sendRequestMessage('publish-item', {
      itemId,
    });
  }
  async closeItem(itemId) {
    return await this.redisMessageExchange.sendRequestMessage('close-item', {
      itemId,
    });
  }
  async updateItem(itemId: string, updateItemDto: UpdateItemDto) {
    return await this.redisMessageExchange.sendRequestMessage('update-item', {
      itemId,
      updateItemDto,
    });
  }
  async deleteItem(itemId: string) {
    return await this.redisMessageExchange.sendRequestMessage(
      'delete-item',
      itemId,
    );
  }
  async getItemDetails(itemId: string) {
    return await this.redisMessageExchange.sendRequestMessage(
      'get-item-details',
      itemId,
    );
  }
  async getItems(searchOptions: SearchOptionDto) {
    return await this.redisMessageExchange.sendRequestMessage(
      'get-items',
      searchOptions,
    );
  }
}
