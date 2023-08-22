import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns the #${id} user`;
  }

  update(id: number) {
    return `This action updates the #${id} user`;
  }

  remove(id: number) {
    return `This action removes the #${id} user`;
  }
}
