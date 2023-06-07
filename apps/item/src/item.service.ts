import { Injectable } from '@nestjs/common';
import { ItemRepository } from '@app/common/database/item.repository';
import { Types } from 'mongoose';
@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}
  async createItem(item) {
    return await this.itemRepository.create({
      ...item,
      timestamp: new Date(),
      actualPrice: item.startingPrice,
    });
  }
  async publishItem(itemId: string) {
    const _id = new Types.ObjectId(itemId);
    return await this.itemRepository.findOneAndUpdate(
      { _id: _id },
      { published: true },
    );
  }
  async closeItem(itemId: string) {
    const _id = new Types.ObjectId(itemId);
    return await this.itemRepository.findOneAndUpdate(
      { _id },
      { closed: true },
    );
  }
  async updateItem(itemId: string, data) {
    const _id = new Types.ObjectId(itemId);
    return await this.itemRepository.findOneAndUpdate({ _id: _id }, data);
  }
  async deleteItem(itemId: string) {
    const _id = new Types.ObjectId(itemId);
    return await this.itemRepository.deleteOne({ _id: _id });
  }
  async getItemDetails(itemId: string) {
    const _id = new Types.ObjectId(itemId);
    return await this.itemRepository.findOne({ _id: _id });
  }
  async getItems(searchOptions) {
    let sortBy: Record<string, 'asc' | 'desc'> | null = null;
    if (searchOptions.sortBy) {
      sortBy = { [searchOptions.sortBy]: 'desc' };
    }
    console.log(sortBy);
    console.log(searchOptions);
    return await this.itemRepository.find(
      {},
      sortBy,
      Number.parseInt(searchOptions.take),
      Number.parseInt(searchOptions.skip),
    );
  }
  async getCompletedItems(searchOptions) {
    let sortBy: Record<string, 'asc' | 'desc'> | null = null;
    if (searchOptions.sortBy) {
      sortBy = { [searchOptions.sortBy]: 'desc' };
    }
    return await this.itemRepository.find(
      {
        $or: [{ closed: true }, { endTime: { $lt: new Date() } }],
      },
      sortBy,
      Number.parseInt(searchOptions.take),
      Number.parseInt(searchOptions.skip),
    );
  }
  async getOngoingItems(searchOptions) {
    let sortBy: Record<string, 'asc' | 'desc'> | null = null;
    if (searchOptions.sortBy) {
      sortBy = { [searchOptions.sortBy]: 'desc' };
    }
    return await this.itemRepository.find(
      {
        $and: [
          { closed: false },
          { published: true },
          { endTime: { $gt: new Date() } },
        ],
      },
      sortBy,
      Number.parseInt(searchOptions.take),
      Number.parseInt(searchOptions.skip),
    );
  }
  async isOwner(userId, itemId: string) {
    const item = await this.getItemDetails(itemId);
    return userId === item.owner.toString();
  }
}
