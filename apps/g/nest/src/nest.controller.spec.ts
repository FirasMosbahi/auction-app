import { Test, TestingModule } from '@nestjs/testing';
import { NestController } from './nest.controller';
import { NestService } from './nest.service';

describe('NestController', () => {
  let nestController: NestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NestController],
      providers: [NestService],
    }).compile();

    nestController = app.get<NestController>(NestController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nestController.getHello()).toBe('Hello World!');
    });
  });
});
