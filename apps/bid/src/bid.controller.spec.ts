import { Test, TestingModule } from '@nestjs/testing';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';

describe('BidController', () => {
  let bidController: BidController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BidController],
      providers: [BidService],
    }).compile();

    bidController = app.get<BidController>(BidController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bidController.getHello()).toBe('Hello World!');
    });
  });
});
