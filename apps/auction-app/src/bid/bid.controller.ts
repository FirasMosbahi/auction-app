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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BidDto } from '../dto/bid.dto';
@ApiTags('bids managing')
@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}
  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({ type: BidDto })
  @ApiOperation({
    summary:
      'create a new bid , it requires the user token in the header authorization',
  })
  @ApiResponse({ status: 201, description: 'The created bid data.' })
  async placeBid(@Req() req) {
    const result = await this.bidService.placeBid(req.user, req.body);
    if (result?.result === 'error') {
      throw new BadRequestException(result.message);
    } else {
      return result;
    }
  }
  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', description: 'ID of the bid' })
  @ApiOperation({
    summary:
      'get a bid from the bids list , it requires the user token in the header authorization',
  })
  @ApiResponse({ status: 200, description: 'The demanded bid data.' })
  async getBid(@Param('id') id: string) {
    return await this.bidService.getBid(id);
  }
  @Get('/itemBids/:id')
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'skip', description: 'number of items to skip' })
  @ApiQuery({ name: 'take', description: 'number of items to take' })
  @ApiParam({ name: 'id', description: 'ID of the item' })
  @ApiOperation({
    summary:
      'get the bids of a specific item , it requires the user token in the header authorization',
  })
  @ApiResponse({ status: 200, description: 'The demanded bids data.' })
  async getItemsBids(
    @Param('id') id: string,
    @Query() searchOptions: SearchOptionDto,
  ) {
    return await this.bidService.getBids(id, searchOptions);
  }
}
