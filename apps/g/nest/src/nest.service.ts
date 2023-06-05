import { Injectable } from '@nestjs/common';

@Injectable()
export class NestService {
  getHello(): string {
    return 'Hello World!';
  }
}
