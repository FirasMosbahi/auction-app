import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Item } from '@app/common/database/item.schema';
import { ItemRepository } from '@app/common/database/item.repository';
import { User } from '@app/common/database/user.schema';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}
  async createItem(item) {
    return await this.itemRepository.create(item);
  }
  async publishItem(itemId: string) {
    return await this.itemRepository.findOneAndUpdate(
      { _id: itemId },
      { published: true },
    );
  }
  async closeItem(itemId: string) {
    return await this.itemRepository.findOneAndUpdate(
      { _id: itemId },
      { closed: true },
    );
  }
  async updateItem(itemId: string, data) {
    return await this.itemRepository.findOneAndUpdate({ _id: itemId }, data);
  }
  async deleteItem(itemId: string) {
    return await this.itemRepository.deleteOne({ _id: itemId });
  }
  async getItemDetails(itemId: string) {
    return await this.itemRepository.findOne({ _id: itemId });
  }
  async getItems(searchOptions) {
    let sortBy = {};
    if (searchOptions.sortCriteria) {
      sortBy = { [searchOptions.sortCriteria]: 'desc' };
    }
    return await this.itemRepository.find(
      {},
      sortBy,
      searchOptions.limit,
      searchOptions.skip,
    );
  }
  async isOwner(user: User, itemId: string) {
    const item = await this.getItemDetails(itemId);
    return item.owner._id === user._id;
  }
}
