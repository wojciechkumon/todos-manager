import { useContainer } from 'class-validator';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { DynamicModule } from '@nestjs/common/interfaces/modules';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../src/auth/auth.service';

export const initTestAppFromModule = async (
  testingModule: TestingModule,
  module: Type | DynamicModule,
): Promise<INestApplication> => {
  const app = testingModule.createNestApplication();
  useContainer(app.select(module), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  await app.init();
  return app;
};

export const createAuthorizationHeader = async (
  jwtService: JwtService,
): Promise<string> => {
  const jwtPayload: JwtPayload = {
    sub: 'c0680f91-9a9c-469a-9294-21df6551c40a',
    email: 'email@email.com',
  };
  const jwt = await jwtService.signAsync(jwtPayload);
  return `Bearer ${jwt}`;
};
