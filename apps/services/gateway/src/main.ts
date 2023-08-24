/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  Logger,
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GatewayModule } from './app/gateway.module';
import { RpcExceptionFilter } from './filters/rpc-exception.filter';

const globalValidationPipeOptions: ValidationPipeOptions = {
  transform: true,
  skipMissingProperties: false,
  skipNullProperties: false,
  skipUndefinedProperties: false,
} as ValidationPipeOptions;

const routesToExcludeFromGlobalRoutePrefix: string[] = [];

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const globalPrefix = 'api';

  app.useGlobalPipes(new ValidationPipe(globalValidationPipeOptions));
  app.setGlobalPrefix(globalPrefix, {
    exclude: routesToExcludeFromGlobalRoutePrefix,
  });
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.useGlobalFilters(new RpcExceptionFilter());
  // app.enableCors({ origin: environmentService.get('CORS_ORIGIN') });

  const port = process.env.GATEWAY_PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 API Gateway is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
