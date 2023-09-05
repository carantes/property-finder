import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';

describe('AccountsService', () => {
  let service: AccountsService;
  const mockAccountsRepository = { create: jest.mock, findOne: jest.mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        { provide: AccountsRepository, useValue: mockAccountsRepository },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
