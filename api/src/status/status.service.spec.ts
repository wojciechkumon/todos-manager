import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { StatusDto } from './dto/Status.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('StatusService', () => {
  let statusService: StatusService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusService,
        {
          provide: DataSource,
          useValue: createMock<DataSource>(),
        },
      ],
    }).compile();

    statusService = module.get<StatusService>(StatusService);
    dataSource = module.get<DataSource>(DataSource);
  });

  describe('getStatus()', () => {
    it('should return status ok when DB works', async () => {
      (dataSource.query as jest.Mock).mockResolvedValue([{ status: 1 }]);

      const status = await statusService.getStatus();

      expect(status).toEqual({ status: 'OK' } satisfies StatusDto);
    });

    it('should throw an error when DB connection is not working', async () => {
      (dataSource.query as jest.Mock).mockRejectedValue(
        new Error('test DB error'),
      );

      await expect(() => statusService.getStatus()).rejects.toThrow(
        new InternalServerErrorException('No connection with the database'),
      );
    });
  });
});
