import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let itemController: ItemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService],
    }).compile();

    itemController = app.get<ItemController>(ItemController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(itemController.getHello()).toBe('Hello World!');
    });
  });
});
