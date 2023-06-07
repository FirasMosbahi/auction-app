import { Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty({ description: 'The name of the item.' })
  name: string;
  @ApiProperty({ description: 'The description of the item.' })
  description: string;
  @ApiProperty({ description: 'The starting price of the item.' })
  startingPrice: number;
  @ApiProperty({ description: 'The end time of making bids of the item.' })
  endTime: Date;
}
