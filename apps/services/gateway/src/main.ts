/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { GatewayModule } from './app/gateway.module';
import { RpcExceptionFilter } from './app/filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get<ConfigService>(ConfigService);
  const reflector = app.get(Reflector);

  // Global middlewares
  app.enableCors({
    credentials: true,
    origin: [configService.get('CORS_ORIGIN')],
    optionsSuccessStatus: 200,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });

  // Versionate resources
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Info: Using cookies to store auth and refresh tokens
  // Cookies, with httpOnly, secure and SameSite=strict flags, are more secure.
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());

  // TODO: Setup Nginx as a webserver
  // app.enable('trust proxy') //only if behind reverse proxy e. g. nginx

  // TODO: Setup Swagger API documentation
  // if(configService.get('NODE_ENV') === 'development') {
  //   setupSwagger(app)
  // }

  app.setGlobalPrefix(configService.get('API_PREFIX') || '/api');

  // TODO: Review Global pipes, interceptors and filters
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen(Number(configService.get('GATEWAY_PORT')) || 3000);
}

void bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
