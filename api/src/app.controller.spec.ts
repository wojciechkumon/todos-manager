import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthGuard } from './auth/auth.guard';
import { createMock } from '@golevelup/ts-jest';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    })
      .overrideGuard(AuthGuard)
      .useValue(createMock<AuthGuard>())
      .compile();

    appController = app.get<AppController>(AppController);
    const authGuard = app.get<AuthGuard>(AuthGuard);
    (authGuard.canActivate as jest.Mock).mockResolvedValue(true);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toEqual({ status: 'OK' });
    });
  });
});
