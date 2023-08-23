/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const {
    PROPERTY_SERVICE_PORT,
    PROPERTY_SERVICE_TCP_HOST,
    PROPERTY_SERVICE_TCP_PORT,
  } = process.env;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: PROPERTY_SERVICE_TCP_HOST,
      port: PROPERTY_SERVICE_TCP_PORT,
    },
  });

  await app.startAllMicroservices();
  await app.listen(PROPERTY_SERVICE_PORT);
  Logger.log(
    `🚀 Property service is running on: http://localhost:${PROPERTY_SERVICE_PORT}`
  );
}

bootstrap();
