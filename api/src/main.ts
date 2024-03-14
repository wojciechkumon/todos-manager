import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { configuration } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());

  const port = configuration().port;
  console.log(`Listening on http://localhost:${port}`);
  await app.listen(port);
}

bootstrap();
