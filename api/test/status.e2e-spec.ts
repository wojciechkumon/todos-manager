import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpStatus,
  INestApplication,
  InternalServerErrorException,
} from '@nestjs/common';
import * as request from 'supertest';
import { initTestAppFromModule } from './e2e-utils';
import { StatusModule } from '../src/status/status.module';
import { createMock } from '@golevelup/ts-jest';
import { StatusService } from '../src/status/status.service';
import { StatusDto } from '../src/status/dto/Status.dto';
import { ErrorResponseDto } from '../src/common/dto/error-response.dto';

describe('StatusController (e2e)', () => {
  const statusEndpoint = '/status';
  let app: INestApplication;
  let statusService: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StatusModule],
    })
      .overrideProvider(StatusService)
      .useValue(createMock<StatusService>())
      .compile();

    app = await initTestAppFromModule(module, StatusModule);
    statusService = module.get<StatusService>(StatusService);
  });

  afterAll(() => app.close());

  describe(`GET ${statusEndpoint}`, () => {
    it('should return status OK', () => {
      (statusService.getStatus as jest.Mock).mockResolvedValue({
        status: 'OK',
      } satisfies StatusDto);

      return request(app.getHttpServer())
        .get(statusEndpoint)
        .expect(HttpStatus.OK)
        .expect({ status: 'OK' });
    });

    it('should return HTTP 500 on errorOK', () => {
      (statusService.getStatus as jest.Mock).mockRejectedValue(
        new InternalServerErrorException('No connection with the database'),
      );

      return request(app.getHttpServer())
        .get(statusEndpoint)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        .expect({
          statusCode: 500,
          message: 'No connection with the database',
          error: 'Internal Server Error',
        } satisfies ErrorResponseDto);
    });
  });
});
