import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/loginDto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  async login(dto: LoginDto) {
    return this.usersRepository.login(dto);
  }

  async getAllUsers() {
    return await this.usersRepository.getAllUsers();
  }

  async changeOnlineStatus(id, status) {
    return await this.usersRepository.updateUserOnlineStatus(id, status);
  }

  async changeOnlineStatusDelay(id, status) {
    return await this.usersRepository.updateUserOnlineStatusDelay(id, status);
  }
}
