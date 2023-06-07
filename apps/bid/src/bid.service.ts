import { Injectable } from '@nestjs/common';
import { ItemRepository } from '@app/common/database/item.repository';
import { BidRepository } from '@app/common/database/bid.repository';
import { Types } from 'mongoose';

@Injectable()
export class BidService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly bidRepository: BidRepository,
  ) {}
  async createBid(bidData) {
    const isValidate = await this.isValidateBid(bidData.price, bidData.item);
    if (isValidate === 'is validate') {
      const session = await this.bidRepository.startTransaction();
      let bid;
      try {
        bid = await this.bidRepository.create({
          ...bidData,
          timestamp: new Date(),
        });
        await this.itemRepository.findOneAndUpdate(
          { _id: new Types.ObjectId(bidData.item) },
          {
            highestBid: bid._id.toString(),
            actualPrice: bid.price,
          },
        );
        await session.commitTransaction();
      } catch (e) {
        await session.abortTransaction();
      }
      await session.endSession();
      return bid;
    } else {
      return { result: 'error', message: isValidate };
    }
  }
  async getItemBids(itemId, searchOptions) {
    const sort: Record<string, 'asc' | 'desc'> = { price: 'desc' };
    return await this.bidRepository.find(
      { item: itemId },
      sort,
      Number.parseInt(searchOptions.take) + Number.parseInt(searchOptions.skip),
      Number.parseInt(searchOptions.skip),
    );
  }
  async getBid(bidId) {
    return await this.bidRepository.findOne({ _id: new Types.ObjectId(bidId) });
  }
  async isValidateBid(price: number, itemId: string): Promise<string> {
    const actualDate = new Date();
    const item = await this.itemRepository.findOne({
      _id: new Types.ObjectId(itemId),
    });
    const lastBid = await this.bidRepository.findOne({
      _id: new Types.ObjectId(item.highestBid),
    });
    if (!item) {
      return 'no item with this id';
    }
    if (item.closed) {
      return 'this item is closed';
    }
    if (!item.published) {
      return 'this item is not published yet';
    }
    if (item.actualPrice > price) {
      return 'The price is not enought to make a bid';
    }
    if (item.endTime <= actualDate) {
      return 'biding time is over';
    }
    if (new Date().getTime() - lastBid.timestamp.getTime() < 5000) {
      return 'A delay of 5 seconds is obligatory between bids';
    }
    return 'is validate';
  }
}
