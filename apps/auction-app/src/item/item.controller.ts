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
} from '@nestjs/common';
import { ItemService } from './item.service';
import { UpdateItemDto } from '../dto/update.item.dto';
import { SearchOptionDto } from '../dto/search.option.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Post()
  async createItem(@Req() req) {
    return await this.itemService.createItem(req.user, req.body);
  }
  @Patch('/publish/:id')
  async publishItem(@Param('id') id: string) {
    return await this.itemService.publishItem(id);
  }
  @Patch('/update/:id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return await this.itemService.updateItem(id, updateItemDto);
  }
  @Patch('/close/:id')
  async closeItem(@Param('id') id: string) {
    return await this.itemService.closeItem(id);
  }
  @Delete('/:id')
  async deleteItem(@Param('id') id: string) {
    return await this.itemService.deleteItem(id);
  }
  @Get('/:id')
  async getItemDetails(@Param('id') id: string) {
    return await this.itemService.getItemDetails(id);
  }
  @Get()
  async getItems(@Query() searchOption: SearchOptionDto) {
    return await this.itemService.getItems(searchOption);
  }
}
