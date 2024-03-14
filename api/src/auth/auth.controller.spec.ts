import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { createMock } from '@golevelup/ts-jest';
import { JwtDto } from './dto/jwt.dto';
import { BadRequestException } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: createMock<AuthService>() },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register()', () => {
    const registrationDto: RegistrationDto = {
      email: 'email@email.com',
      password: 'passworD!',
    };

    it('should register a user', async () => {
      const serviceResponse: JwtDto = { access_token: 'JWT' };
      (authService.register as jest.Mock).mockResolvedValue(serviceResponse);

      const response = await authController.register(registrationDto);

      expect(response).toEqual(serviceResponse);
    });

    it('should throw on the service rejection', async () => {
      const error = new BadRequestException('error');
      (authService.register as jest.Mock).mockRejectedValue(error);

      await expect(() =>
        authController.register(registrationDto),
      ).rejects.toThrow(error);
    });
  });
});
