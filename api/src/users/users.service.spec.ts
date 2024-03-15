import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/ts-jest';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMock<Repository<User>>(),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('register()', () => {
    const createUserDto: CreateUserDto = {
      email: 'abc@email.com',
      passwordHash: 'passwordHash',
    };

    it('should successfully save a new user', async () => {
      const id = '375ea706-b908-410e-ba0e-d17253ed7f41';
      const insertSpy = (usersRepository.insert as jest.Mock).mockResolvedValue(
        {
          identifiers: [{ id }],
          generatedMaps: [{ id, createdAt: '2024-03-13T21:25:25.216Z' }],
          raw: [{ id, created_at: '2024-03-13T21:25:25.216Z' }],
        } satisfies InsertResult,
      );

      const userId = await usersService.register(createUserDto);

      expect(userId).toEqual(id);
      expect(insertSpy).toHaveBeenCalled();
      const user: User = insertSpy.mock.calls[0][0];
      expect(user.email).toEqual(createUserDto.email);
      expect(user.passwordHash).toEqual(createUserDto.passwordHash);
    });

    it('should fail on user already exists error', async () => {
      const driverError = new Error(
        'duplicate key value violates unique constraint "UQ_e12875dfb3b1d92d7d7c5377e22"',
      );
      (driverError as any).code = '23505';
      const emailAlreadyExistError = new QueryFailedError(
        'query',
        [],
        driverError,
      );
      const insertSpy = (usersRepository.insert as jest.Mock).mockRejectedValue(
        emailAlreadyExistError,
      );

      await expect(usersService.register(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(insertSpy).toHaveBeenCalled();
    });

    it('should fail on unexpected error', async () => {
      const unexpectedError = new Error('unexpected error');
      const insertSpy = (usersRepository.insert as jest.Mock).mockRejectedValue(
        unexpectedError,
      );

      await expect(usersService.register(createUserDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(insertSpy).toHaveBeenCalled();
    });
  });

  describe('findByEmail()', () => {
    const email = 'test@email.com';

    it('should find existing user', async () => {
      const user = new User();
      user.email = email;
      (usersRepository.findOneBy as jest.Mock).mockResolvedValue(user);

      const result = await usersService.findByEmail(email);

      expect(result).toEqual(user);
    });

    it('should not find user', async () => {
      (usersRepository.findOneBy as jest.Mock).mockResolvedValue(null);

      const result = await usersService.findByEmail(email);

      expect(result).toBeNull();
    });
  });
});
