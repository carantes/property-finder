/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { IdentityModule } from './app/identity.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const { IDENTITY_SERVICE_HOST, IDENTITY_SERVICE_PORT } = process.env;
  console.log(
    'identity service envs',
    IDENTITY_SERVICE_HOST,
    IDENTITY_SERVICE_PORT
  );
  const app = await NestFactory.createMicroservice(IdentityModule, {
    transport: Transport.TCP,
    options: {
      host: IDENTITY_SERVICE_HOST || '0.0.0.0',
      port: IDENTITY_SERVICE_PORT || '3001',
    } as TcpOptions,
  });

  await app.listen();
}

bootstrap();
