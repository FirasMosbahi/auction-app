import { Controller, Get } from '@nestjs/common';
import { ItemService } from './item.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @MessagePattern('create-item')
  async handleCreateItem(@Payload() item) {
    return await this.itemService.createItem(item);
  }
  @MessagePattern('publish-item')
  async handlePublishItem(@Payload() itemId) {
    return await this.itemService.publishItem(itemId);
  }
  @MessagePattern('close-item')
  async handleCloseItem(@Payload() itemId) {
    return await this.itemService.closeItem(itemId);
  }
  @MessagePattern('update-item')
  async handleUpdateItem(@Payload() data) {
    return await this.itemService.updateItem(data.itemId, data.updateItemDto);
  }
  @MessagePattern('delete-item')
  async handleDeleteItem(@Payload() itemId) {
    return await this.itemService.deleteItem(itemId);
  }
  @MessagePattern('get-item-details')
  async handleGetItemDetails(@Payload() itemId) {
    return await this.itemService.getItemDetails(itemId);
  }
  @MessagePattern('all-items')
  async handleGetItems(@Payload() searchOptions) {
    return await this.itemService.getItems(searchOptions);
  }
  @MessagePattern('is-item-owner')
  async handleIsItemOwner(@Payload() data) {
    return await this.itemService.isOwner(data.user, data.itemId);
  }
  @MessagePattern('completed-items')
  async handleGetCompletedItems(@Payload() searchOptions){
    return await this.itemService.getCompletedItems(searchOptions);
  }
  @MessagePattern('ongoing-items')
  async handleGetOngoingItems(@Payload() searchOptions){
    return await this.itemService.getOngoingItems(searchOptions);
  }
}
