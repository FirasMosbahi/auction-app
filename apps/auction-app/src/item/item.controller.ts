import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { UpdateItemDto } from '../dto/update.item.dto';
import { SearchOptionDto } from '../dto/search.option.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ItemOwnerGuard } from '../guards/item.owner.guard';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Post()
  @UseGuards(AuthGuard)
  async createItem(@Req() req) {
    return await this.itemService.createItem(req.user, req.body);
  }
  @Patch('/publish/:id')
  @UseGuards(AuthGuard, ItemOwnerGuard)
  async publishItem(@Param('id') id: string) {
    return await this.itemService.publishItem(id);
  }
  @Patch('/update/:id')
  @UseGuards(AuthGuard, ItemOwnerGuard)
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return await this.itemService.updateItem(id, updateItemDto);
  }
  @Patch('/close/:id')
  @UseGuards(AuthGuard, ItemOwnerGuard)
  async closeItem(@Param('id') id: string) {
    return await this.itemService.closeItem(id);
  }
  @Delete('/:id')
  @UseGuards(AuthGuard, ItemOwnerGuard)
  async deleteItem(@Param('id') id: string) {
    return await this.itemService.deleteItem(id);
  }
  @Get('/details/:id')
  async getItemDetails(@Param('id') id: string) {
    return await this.itemService.getItemDetails(id);
  }
  @Get()
  async getItems(@Query() searchOption: SearchOptionDto) {
    return await this.itemService.getItems(searchOption);
  }
  @Get('/completed')
  async getCompletedItems(@Query() searchOptions: SearchOptionDto) {
    return await this.itemService.getCompletedItems(searchOptions);
  }
  @Get('/ongoing')
  @UseGuards(AuthGuard)
  async getOngoingItems(@Query() searchOptions: SearchOptionDto) {
    return await this.itemService.getOngoingItems(searchOptions);
  }
}
