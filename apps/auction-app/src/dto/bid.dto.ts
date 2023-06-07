import { ApiProperty } from '@nestjs/swagger';

export class BidDto {
  @ApiProperty({ description: 'The id of the item.' })
  itemId: string;
  @ApiProperty({ description: 'The price in this bid.' })
  price: number;
}
