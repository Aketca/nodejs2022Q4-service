import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = {
      id: uuidv4(),
      ...createUserDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    const createdUser = this.userRepository.create(user);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      return user.toResponse();
    }
    return undefined;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (updatedUser) {
      if (updateUserDto.oldPassword === updatedUser.password) {
        const user = {
          updatedAt: Date.now(),
          version: updatedUser.version + 1,
          password: updateUserDto.newPassword,
        };
        Object.assign(updatedUser, user);
        return (await this.userRepository.save(updatedUser)).toResponse();
      } else {
        return 403;
      }
    }
    return undefined;
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      return undefined;
    } else {
      return 'success';
    }
  }
}
