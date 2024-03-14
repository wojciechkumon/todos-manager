import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { IsEmailUniqueValidator } from './IsEmailUnique';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';

describe('IsEmailUnique', () => {
  const email = 'email@email.com';
  let validator: IsEmailUniqueValidator;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsEmailUniqueValidator,
        { provide: UsersService, useValue: createMock<UsersService>() },
      ],
    }).compile();

    validator = module.get<IsEmailUniqueValidator>(IsEmailUniqueValidator);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should return true if email is unique', async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

    const result = await validator.validate(email);

    expect(result).toBe(true);
  });

  it('should return false if email already exists', async () => {
    const user = new User();
    user.email = email;
    (usersService.findByEmail as jest.Mock).mockResolvedValue(user);

    const result = await validator.validate(email);

    expect(result).toBe(false);
  });
});
