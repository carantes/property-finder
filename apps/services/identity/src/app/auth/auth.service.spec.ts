import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AccountsRepository } from '../accounts/accounts.repository';
import { AccountsService } from '../accounts/accounts.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockAccountsRepository = { create: jest.mock, findOne: jest.mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AccountsService,
        { provide: AccountsRepository, useValue: mockAccountsRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
