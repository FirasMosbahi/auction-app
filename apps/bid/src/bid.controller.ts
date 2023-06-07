import { Controller } from '@nestjs/common';
import { BidService } from './bid.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class BidController {
  constructor(private readonly bidService: BidService) {}
  @MessagePattern('create-bid')
  async handleCreateBid(@Payload() bidData) {
    return await this.bidService.createBid(bidData);
  }
  @MessagePattern('search-item-bids')
  async handleGetItemBids(@Payload() { itemId, searchOption }) {
    return await this.bidService.getItemBids(itemId, searchOption);
  }
  @MessagePattern('get-bid')
  async handleGetBid(@Payload() bidId) {
    return await this.bidService.getBid(bidId);
  }
  @MessagePattern('is-Validate-Bid')
  async handleisValidateBid(@Payload() { price, itemId }) {
    return await this.bidService.isValidateBid(price, itemId);
  }
}
