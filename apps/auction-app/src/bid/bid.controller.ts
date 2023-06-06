import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { BidService } from './bid.service';
import { SearchOptionDto } from '../dto/search.option.dto';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}
  @Post()
  async placeBid(@Req() req) {
    return await this.bidService.placeBid(req.user, req.body);
  }
  @Get('/:id')
  async getBid(@Param('id') id: string) {
    return await this.bidService.getBid(id);
  }
  @Get('/itemBids/:id')
  async getItemsBids(
    @Param('id') id: string,
    @Query() searchOptions: SearchOptionDto,
  ) {
    return await this.bidService.getBids(id, searchOptions);
  }
}
