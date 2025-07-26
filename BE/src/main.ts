import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '3001');
  await app.listen(port, () => {
    Logger.log(`Listening at http://127.0.0.1:${port}`);
    Logger.log(`===================================`);
  });
}
void bootstrap();
