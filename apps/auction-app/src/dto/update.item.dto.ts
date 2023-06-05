import { ItemDto } from './item.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateItemDto extends PartialType(ItemDto) {}
