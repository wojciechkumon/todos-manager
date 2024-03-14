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
import { LoginDto } from '../src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from '../src/auth/auth.service';

describe('AuthController (e2e)', () => {
  const registrationEndpoint = '/auth/registration';
  const loginEndpoint = '/auth/login';
  let app: INestApplication;
  let usersRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(createMock<Repository<User>>())
      .compile();

    app = await initTestAppFromModule(module, AuthModule);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterAll(() => app.close());

  describe(`POST ${registrationEndpoint}`, () => {
    test('successful registration', async () => {
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
        .then(async (response) => {
          const body: JwtDto = response.body;
          expect(body.access_token).toBeDefined();
          const parsedJwt = await jwtService.verifyAsync(body.access_token);
          expect(parsedJwt.sub).toEqual(userId);
          expect(parsedJwt.email).toEqual(registrationDto.email);
        });
    });

    test('error: wrong email format', () => {
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

    test('error: email already exists', () => {
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

    test('error: weak password', () => {
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

  describe(`POST ${loginEndpoint}`, () => {
    const createUser = async (
      email: string,
      password: string,
    ): Promise<User> => {
      const user = new User();
      user.id = '375ea706-6666-410e-ba0e-d17253ed7f41';
      user.email = email;
      user.passwordHash = await bcrypt.hash(password, SALT_OR_ROUNDS);
      user.createdAt = new Date();
      return user;
    };

    test('successful login', async () => {
      const loginDto: LoginDto = {
        email: 'test@email.com',
        password: 'passworD!',
      };
      const user = await createUser(loginDto.email, loginDto.password);
      (usersRepository.findOneBy as jest.Mock).mockResolvedValue(user);

      return request(app.getHttpServer())
        .post(loginEndpoint)
        .send(loginDto)
        .expect(HttpStatus.OK)
        .then(async (response) => {
          const body: JwtDto = response.body;
          expect(body.access_token).toBeDefined();
          const parsedJwt = await jwtService.verifyAsync(body.access_token);
          expect(parsedJwt.sub).toEqual(user.id);
          expect(parsedJwt.email).toEqual(user.email);
        });
    });

    test('login failed on invalid password', async () => {
      const loginDto: LoginDto = {
        email: 'test@email.com',
        password: 'invalid-password',
      };
      const user = await createUser(loginDto.email, 'realPassword!');
      (usersRepository.findOneBy as jest.Mock).mockResolvedValue(user);

      return request(app.getHttpServer())
        .post(loginEndpoint)
        .send(loginDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    test('login failed on empty password', async () => {
      const loginDto = {
        email: 'test@email.com',
      };
      const user = await createUser(loginDto.email, 'passworD!');
      (usersRepository.findOneBy as jest.Mock).mockResolvedValue(user);

      return request(app.getHttpServer())
        .post(loginEndpoint)
        .send(loginDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    test('login failed on no email', async () => {
      const loginDto = { password: 'passworD!' };
      const user = await createUser('test@email.com', loginDto.password);
      (usersRepository.findOneBy as jest.Mock).mockResolvedValue(user);

      return request(app.getHttpServer())
        .post(loginEndpoint)
        .send(loginDto)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
