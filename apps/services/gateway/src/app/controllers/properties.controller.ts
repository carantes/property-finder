import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  PROPERTY_SERVICE_TOKEN,
  PropertyDto,
  findAllPropertiesCommand,
} from '@property-finder/services/common';
import { Observable, catchError, throwError } from 'rxjs';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('properties')
export class PropertiesController {
  constructor(
    @Inject(PROPERTY_SERVICE_TOKEN) private propertyServiceClient: ClientProxy
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public findAllProperties(): Observable<PropertyDto[]> {
    return this.propertyServiceClient
      .send(findAllPropertiesCommand, {})
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }
}
