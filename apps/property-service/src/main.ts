/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = Number.parseInt(process.env.PROPERTY_SERVICE_PORT || '3000');
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 Property service is running on: http://localhost:${port}`);
}

bootstrap();
