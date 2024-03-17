import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { configuration } from './config/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const setupValidation = (app: INestApplication): void => {
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
};

const setupOpenApi = (app: INestApplication): void => {
  const openApiConfig = new DocumentBuilder()
    .setTitle('Todos Manager API')
    .setDescription('The API provides your todos management.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('/', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupValidation(app);
  setupOpenApi(app);

  const port = configuration().port;
  new Logger('bootstrap').log(`Listening on http://localhost:${port}`);
  await app.listen(port);
}

bootstrap();
