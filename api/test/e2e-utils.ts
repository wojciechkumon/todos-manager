import { useContainer } from 'class-validator';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { DynamicModule } from '@nestjs/common/interfaces/modules';

export const initTestAppFromModule = async (
  testingModule: TestingModule,
  module: Type | DynamicModule,
): Promise<INestApplication> => {
  const app = testingModule.createNestApplication();
  useContainer(app.select(module), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  return app;
};
