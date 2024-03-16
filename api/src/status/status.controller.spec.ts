import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { StatusDto } from './dto/Status.dto';
import { StatusService } from './status.service';
import { createMock } from '@golevelup/ts-jest';
import { InternalServerErrorException } from '@nestjs/common';

describe('StatusController', () => {
  let statusController: StatusController;
  let statusService: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        { provide: StatusService, useValue: createMock<StatusService>() },
      ],
    }).compile();

    statusController = module.get<StatusController>(StatusController);
    statusService = module.get<StatusService>(StatusService);
  });

  describe('status endpoint', () => {
    it('should return status OK', async () => {
      const statusDto: StatusDto = { status: 'OK' };
      (statusService.getStatus as jest.Mock).mockResolvedValue(statusDto);

      const result = await statusController.getStatus();

      expect(result).toEqual(statusDto);
    });

    it('should forward exception from the service', async () => {
      const error = new InternalServerErrorException();
      (statusService.getStatus as jest.Mock).mockRejectedValue(error);

      await expect(() => statusController.getStatus()).rejects.toThrow(error);
    });
  });
});
