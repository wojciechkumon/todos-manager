import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { AuthService, SALT_OR_ROUNDS } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RegistrationDto } from './dto/registration.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwt-secret-key',
          signOptions: { expiresIn: '7 days' },
        }),
      ],
      providers: [
        AuthService,
        { provide: UsersService, useValue: createMock<UsersService>() },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register()', () => {
    const registrationDto: RegistrationDto = {
      email: 'abc@email.com',
      password: 'passworD!',
    };

    it('should register a new user', async () => {
      const userId = '375ea706-b908-410e-ba0e-d17253ed7f41';
      const registerMock = (
        usersService.register as jest.Mock
      ).mockResolvedValue(userId);

      const result = await authService.register(registrationDto);

      expect(result?.access_token).toBeDefined();
      expect(registerMock).toHaveBeenCalled();
      const createUserDto: CreateUserDto = registerMock.mock.calls[0][0];
      expect(createUserDto.email).toEqual(registrationDto.email);
      expect(
        await bcrypt.compare(
          registrationDto.password,
          createUserDto.passwordHash,
        ),
      ).toEqual(true);
      const parsedJwt = await jwtService.verifyAsync(result.access_token);
      expect(parsedJwt.sub).toEqual(userId);
      expect(parsedJwt.email).toEqual(registrationDto.email);
    });

    it('should not register on users service error', async () => {
      const error = new Error('users service error');
      (usersService.register as jest.Mock).mockRejectedValue(error);

      await expect(authService.register(registrationDto)).rejects.toThrow(
        error,
      );
    });
  });

  describe('login()', () => {
    const loginDto: LoginDto = {
      email: 'test@test.com',
      password: 'passworD!',
    };
    const createUser = async (): Promise<User> => {
      const user = new User();
      user.id = '375ea706-1234-410e-ba0e-d17253ed7f41';
      user.email = loginDto.email;
      user.passwordHash = await bcrypt.hash(loginDto.password, SALT_OR_ROUNDS);
      user.createdAt = new Date();
      return user;
    };

    it('should login a user', async () => {
      const user = await createUser();
      (usersService.findByEmail as jest.Mock).mockResolvedValue(user);

      const result = await authService.login(loginDto);

      expect(result?.access_token).toBeDefined();
      const parsedJwt = await jwtService.verifyAsync(result.access_token);
      expect(parsedJwt.sub).toEqual(user.id);
      expect(parsedJwt.email).toEqual(user.email);
    });

    it('should not login a user: not existing email', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should not login a user: incorrect password', async () => {
      const user = await createUser();
      (usersService.findByEmail as jest.Mock).mockResolvedValue(user);
      const invalidPasswordLoginDto: LoginDto = {
        ...loginDto,
        password: 'invalid',
      };

      await expect(authService.login(invalidPasswordLoginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
