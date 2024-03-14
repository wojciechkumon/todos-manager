import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { RegistrationDto } from '../src/auth/dto/registration.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { JwtDto } from '../src/auth/dto/jwt.dto';
import { initTestAppFromModule } from './e2e-utils';

describe('AuthController (e2e)', () => {
  const registrationEndpoint = '/auth/registration';
  let app: INestApplication;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(createMock<Repository<User>>())
      .compile();

    app = await initTestAppFromModule(module, AuthModule);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(() => app.close());

  test(`POST ${registrationEndpoint} - successful registration`, () => {
    const userId = '375ea706-b908-410e-ba0e-d17253ed7f42';
    (usersRepository.findOneBy as jest.Mock).mockResolvedValue(null);
    (usersRepository.insert as jest.Mock).mockResolvedValue({
      identifiers: [{ id: userId }],
      generatedMaps: [{ id: userId, createdAt: '2024-03-13T21:25:25.216Z' }],
      raw: [{ id: userId, created_at: '2024-03-13T21:25:25.216Z' }],
    } satisfies InsertResult);
    const registrationDto: RegistrationDto = {
      email: 'email@email.com',
      password: 'passworD!',
    };

    return request(app.getHttpServer())
      .post(registrationEndpoint)
      .send(registrationDto)
      .expect(HttpStatus.CREATED)
      .then((response) => {
        const body: JwtDto = response.body;
        expect(body.access_token).toBeDefined();
        expect(body.access_token.length).toBeGreaterThan(100);
      });
  });

  test(`POST ${registrationEndpoint} - error: wrong email format`, () => {
    (usersRepository.findOneBy as jest.Mock).mockResolvedValue(null);
    const registrationDto: RegistrationDto = {
      email: 'itIsNotAnEmail',
      password: 'passworD!',
    };
    const expectedResponse = {
      error: 'Bad Request',
      message: ['email must be an email'],
      statusCode: 400,
    };

    return request(app.getHttpServer())
      .post(registrationEndpoint)
      .send(registrationDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(expectedResponse);
  });

  test(`POST ${registrationEndpoint} - error: email already exists`, () => {
    const user = new User();
    user.id = '375ea706-b908-410e-ba0e-d17253ed7f42';
    user.email = 'email@email.com';
    user.passwordHash = 'passwordHash';
    user.createdAt = new Date('2024-03-13T21:25:25.216Z');
    (usersRepository.findOneBy as jest.Mock).mockResolvedValue(user);
    const registrationDto: RegistrationDto = {
      email: user.email,
      password: 'passworD!',
    };
    const expectedResponse = {
      error: 'Bad Request',
      message: ['email already exists'],
      statusCode: 400,
    };

    return request(app.getHttpServer())
      .post(registrationEndpoint)
      .send(registrationDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(expectedResponse);
  });

  test(`POST ${registrationEndpoint} - error: weak password`, () => {
    (usersRepository.findOneBy as jest.Mock).mockResolvedValue(null);
    const registrationDto: RegistrationDto = {
      email: 'email@email.com',
      password: 'pass',
    };
    const expectedResponse = {
      error: 'Bad Request',
      message: ['password is not strong enough'],
      statusCode: 400,
    };

    return request(app.getHttpServer())
      .post(registrationEndpoint)
      .send(registrationDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(expectedResponse);
  });
});
