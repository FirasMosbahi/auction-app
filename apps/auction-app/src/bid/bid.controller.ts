import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BidService } from './bid.service';
import { SearchOptionDto } from '../dto/search.option.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}
  @Post()
  @UseGuards(AuthGuard)
  async placeBid(@Req() req) {
    const result = await this.bidService.placeBid(req.user, req.body);
    if (result?.result === 'error') {
      throw new BadRequestException(result.message);
    } else {
      return result;
    }
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
