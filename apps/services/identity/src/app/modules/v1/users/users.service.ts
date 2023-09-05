import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';

type FindOneKeyType = 'id' | 'email';

interface IUsersService {
  create(account: CreateUserDto): Promise<UserDto>;
  findOne(key: FindOneKeyType, value: number | string): Promise<UserDto | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto>;
}

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return new UserDto(await this.usersRepository.create(createUserDto));
  }

  public async findOne(
    key: FindOneKeyType,
    value: string | number
  ): Promise<UserDto> {
    return new UserDto(await this.usersRepository.findOne({ [key]: value }));
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    return new UserDto(
      await this.usersRepository.upsert({ _id: id }, updateUserDto)
    );
  }
}
