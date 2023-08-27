import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';

describe('AccountsController', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  xit('should be defined', () => {
    // Todo: Review unit tests
    expect(controller).toBeDefined();
  });
});
