import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { StatusDto } from './dto/Status.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('status endpoint', () => {
    it('should return status OK', () => {
      expect(appController.getStatus()).toEqual({
        status: 'OK',
      } satisfies StatusDto);
    });
  });
});
