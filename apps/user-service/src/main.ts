/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const { USER_SERVICE_PORT, USER_SERVICE_TCP_HOST, USER_SERVICE_TCP_PORT } =
    process.env;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: USER_SERVICE_TCP_HOST,
      port: USER_SERVICE_TCP_PORT,
    },
  });

  await app.startAllMicroservices();
  await app.listen(USER_SERVICE_PORT);
  Logger.log(
    `🚀 User-service is running on: http://localhost:${USER_SERVICE_PORT}`
  );
}

bootstrap();
