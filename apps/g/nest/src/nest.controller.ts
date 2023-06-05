import { Controller, Get } from '@nestjs/common';
import { NestService } from './nest.service';

@Controller()
export class NestController {
  constructor(private readonly nestService: NestService) {}

  @Get()
  getHello(): string {
    return this.nestService.getHello();
  }
}
