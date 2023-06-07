import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from './abstract.repository';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Item } from '@app/common/database/item.schema';

@Injectable()
export class ItemRepository extends AbstractRepository<Item> {
  protected readonly logger = new Logger(ItemRepository.name);

  constructor(
    @InjectModel(Item.name) itemModel: Model<Item>,
    @InjectConnection() connection: Connection,
  ) {
    super(itemModel, connection);
  }
}
