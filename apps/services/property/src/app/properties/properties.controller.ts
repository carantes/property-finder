import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  PropertyDto,
  findAllPropertiesCommand,
} from '@property-finder/services/common';

@Controller('properties')
export class PropertiesController {
  @MessagePattern(findAllPropertiesCommand)
  public async findAllProperties(): Promise<PropertyDto[]> {
    return [
      {
        id: '123',
        name: 'dummy property',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
