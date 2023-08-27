/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { PropertyModule } from './app/property.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const { PROPERTY_SERVICE_HOST, PROPERTY_SERVICE_PORT } = process.env;
  console.log(
    'property service envs',
    PROPERTY_SERVICE_HOST,
    PROPERTY_SERVICE_PORT
  );
  const app = await NestFactory.createMicroservice(PropertyModule, {
    transport: Transport.TCP,
    options: {
      host: PROPERTY_SERVICE_HOST || '0.0.0.0',
      port: PROPERTY_SERVICE_PORT || '3002',
    } as TcpOptions,
  });

  await app.listen();
}

bootstrap();
