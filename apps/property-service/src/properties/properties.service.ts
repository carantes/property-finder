import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  create(createPropertyDto: CreatePropertyDto) {
    return 'This action adds a new property';
  }

  findAll() {
    return `This action returns all properties`;
  }

  findOne(id: number) {
    return `This action returns the #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates the #${id} property`;
  }

  remove(id: number) {
    return `This action removes the #${id} property`;
  }
}
