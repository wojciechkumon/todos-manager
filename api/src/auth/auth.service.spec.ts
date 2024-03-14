import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { AuthService, JwtPayload } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from './dto/registration.dto';
import { JwtDto } from './dto/jwt.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: createMock<UsersService>() },
        { provide: JwtService, useValue: createMock<JwtService>() },
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
      const accessToken = 'accessToken';
      const expectedResult: JwtDto = { access_token: accessToken };
      const registerSpy = (
        usersService.register as jest.Mock
      ).mockResolvedValue(userId);
      const signAsyncSpy = (
        jwtService.signAsync as jest.Mock
      ).mockResolvedValue(accessToken);

      const result = await authService.register(registrationDto);

      expect(result).toEqual(expectedResult);
      expect(registerSpy).toHaveBeenCalled();
      const createUserDto: CreateUserDto = registerSpy.mock.calls[0][0];
      expect(createUserDto.email).toEqual(registrationDto.email);
      expect(createUserDto.passwordHash).toHaveLength(60);
      expect(signAsyncSpy).toHaveBeenCalledWith({
        sub: userId,
        email: registrationDto.email,
      } satisfies JwtPayload);
    });

    it('should not register on users service error', async () => {
      const error = new Error('users service error');
      (usersService.register as jest.Mock).mockRejectedValue(error);

      await expect(authService.register(registrationDto)).rejects.toThrow(
        error,
      );
    });
  });
});
