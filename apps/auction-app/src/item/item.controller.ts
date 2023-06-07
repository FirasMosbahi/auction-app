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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {ItemDto} from "../dto/item.dto";
@ApiTags('items managing')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({ type: ItemDto })
  @ApiOperation({
    summary:
      'create a new item as draft, it requires the user token in the header authorization',
  })
  @ApiResponse({ status: 201, description: 'The created item data.' })
  async createItem(@Req() req) {
    return await this.itemService.createItem(req.user, req.body);
  }
  @Patch('/publish/:id')
  @UseGuards(AuthGuard, ItemOwnerGuard)
  @ApiParam({ name: 'id', description: 'ID of the item to create' })
  @ApiOperation({
    summary:
      'publish a created item, it requires the item creator token in the header authorization',
  })
  @ApiResponse({ status: 200, description: 'The published item data.' })
  async publishItem(@Param('id') id: string) {
    return await this.itemService.publishItem(id);
  }
  @Patch('/update/:id')
  @ApiBody({ type: UpdateItemDto })
  @UseGuards(AuthGuard, ItemOwnerGuard)
  @ApiParam({ name: 'id', description: 'ID of the item to update' })
  @ApiOperation({
    summary:
      'update a created item, it requires the item creator token in the header authorization',
  })
  @ApiResponse({ status: 200, description: 'The updated item data.' })
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return await this.itemService.updateItem(id, updateItemDto);
  }
  @Patch('/close/:id')
  @UseGuards(AuthGuard, ItemOwnerGuard)
  @ApiParam({ name: 'id', description: 'ID of the item to close' })
  @ApiOperation({
    summary:
      'close a created item, it requires the item creator token in the header authorization',
  })
  @ApiResponse({ status: 200, description: 'The closed item data.' })
  async closeItem(@Param('id') id: string) {
    return await this.itemService.closeItem(id);
  }
  @Delete('/:id')
  @UseGuards(AuthGuard, ItemOwnerGuard)
  @ApiParam({ name: 'id', description: 'ID of the item to delete' })
  @ApiOperation({
    summary:
      'delete a created item, it requires the item creator token in the header authorization',
  })
  @ApiResponse({ status: 200, description: 'The deleted item data.' })
  async deleteItem(@Param('id') id: string) {
    return await this.itemService.deleteItem(id);
  }
  @Get('/details/:id')
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', description: 'ID of the item to get details' })
  @ApiOperation({
    summary:
      'get the details of an item, it requires a user token in the header authorization',
  })
  @ApiResponse({ status: 200, description: 'The demanded item data.' })
  async getItemDetails(@Param('id') id: string) {
    return await this.itemService.getItemDetails(id);
  }
  @Get()
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'sortBy',
    description:
      'can have two values timestamp and actual price : defines the criteria of the sort',
  })
  @ApiQuery({ name: 'skip', description: 'number of items to skip' })
  @ApiQuery({ name: 'take', description: 'number of items to take' })
  @ApiOperation({
    summary:
      'get the details of all items, it requires a user token in the header authorization',
  })
  @ApiResponse({
    status: 200,
    description:
      'The items data , you can use the query params sortBy(timestamp/actualPrice) to sort the results and take/skip for pagination.',
  })
  async getItems(@Query() searchOption: SearchOptionDto) {
    return await this.itemService.getItems(searchOption);
  }
  @Get('/completed')
  @ApiQuery({
    name: 'sortBy',
    description:
      'can have two values timestamp and actual price : defines the criteria of the sort',
  })
  @ApiQuery({ name: 'skip', description: 'number of items to skip' })
  @ApiQuery({ name: 'take', description: 'number of items to take' })
  @ApiOperation({ summary: 'get the details of all completed items' })
  @ApiResponse({
    status: 200,
    description:
      'The completed items data , you can use the query params sortBy(timestamp/actualPrice) to sort the results and take/skip for pagination.',
  })
  async getCompletedItems(@Query() searchOptions: SearchOptionDto) {
    return await this.itemService.getCompletedItems(searchOptions);
  }
  @Get('/ongoing')
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'sortBy',
    description:
      'can have two values timestamp and actual price : defines the criteria of the sort',
  })
  @ApiQuery({ name: 'skip', description: 'number of items to skip' })
  @ApiQuery({ name: 'take', description: 'number of items to take' })
  @ApiOperation({ summary: 'get the details of all ongoing items' })
  @ApiResponse({
    status: 200,
    description:
      'The items data , you can use the query params sortBy(timestamp/actualPrice) to sort the results and take/skip for pagination.',
  })
  async getOngoingItems(@Query() searchOptions: SearchOptionDto) {
    return await this.itemService.getOngoingItems(searchOptions);
  }
}
