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
    const res = { ...user };
    delete res.password;
    return res;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((item) => item.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const item = this.users.find((item) => item.id === id);
    if (item) {
      if (updateUserDto.oldPassword === item.password) {
        item.password = updateUserDto.newPassword;
        item.version = item.version + 1;
        item.updatedAt = Date.now();
        const res = { ...item };
        delete res.password;
        return res;
      } else {
        return 403;
      }
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
