import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from './abstract.repository';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Bid } from './bid.schema';

@Injectable()
export class BidRepository extends AbstractRepository<Bid> {
  protected readonly logger = new Logger(BidRepository.name);

  constructor(
    @InjectModel(Bid.name) bidModel: Model<Bid>,
    @InjectConnection() connection: Connection,
  ) {
    super(bidModel, connection);
  }
}
