import { Injectable } from '@nestjs/common';

@Injectable()
export class BidService {
  getHello(): string {
    return 'Hello World!';
  }
}
