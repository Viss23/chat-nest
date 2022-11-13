import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sub } from 'date-fns';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersRepository
  extends Repository<User>
  implements IUsersRepository
{
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async login(dto) {
    return this.createQueryBuilder('user')
      .where('user.username = :username AND user.pass  = :password', dto)
      .getOne();
  }

  async getAllUsers() {
    return await this.createQueryBuilder('user')
      .select(['user.username', 'user.id', 'user.isOnline'])
      .getMany();
  }

  async updateUserOnlineStatus(userId, isOnline: boolean) {
    return await this.createQueryBuilder('user')
      .update(User)
      .set({ isOnline, lastUpdate: new Date(Date.now()) })
      .where('id = :id', { id: userId })
      .execute();
  }

  async updateUserOnlineStatusDelay(userId, isOnline: boolean) {
    const updateResult = await this.createQueryBuilder('user')
      .update(User)
      .set({ isOnline, lastUpdate: new Date(Date.now()) })
      .where('id = :id AND lastUpdate < :lastUpdate', {
        id: userId,
        lastUpdate: sub(new Date(Date.now()), {
          seconds: 10,
        }),
      })
      .execute();

    return updateResult.affected;
  }
}
