import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  create(createUserDto: CreateUserDto) {
    const user = {
      id: uuidv4(),
      ...createUserDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((item) => item.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const item = this.users.find((item) => item.id === id);
    if (updateUserDto.oldPassword !== item.password) {
      return 403;
    } else if (item) {
      item.password = updateUserDto.newPassword;
      return item;
    }
    return undefined;
  }

  remove(id: string) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      return 'User was removed';
    }
    return undefined;
  }
}
