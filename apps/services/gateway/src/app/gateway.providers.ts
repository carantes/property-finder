import { ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';
import { IDENTITY_SERVICE_TOKEN } from '@property-finder/services/common';

export const identityServiceProvider = {
  provide: IDENTITY_SERVICE_TOKEN,
  useFactory: (configService: ConfigService) => {
    return ClientProxyFactory.create({
      options: {
        port: configService.get('IDENTITY_SERVICE_PORT'),
        host: configService.get('IDENTITY_SERVICE_HOST'),
      },
      transport: Transport.TCP,
    } as TcpClientOptions);
  },
  inject: [ConfigService],
};
