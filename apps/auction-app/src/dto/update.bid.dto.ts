import { PartialType } from '@nestjs/mapped-types';
import { BidDto } from './bid.dto';

export class UpdateBidDto extends PartialType(BidDto) {}
