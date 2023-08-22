/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // /api
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // /api/v1
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const port = process.env.BFF_PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 BFF is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
