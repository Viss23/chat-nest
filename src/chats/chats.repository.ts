import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IChatsRepository } from './chats.repository.interface';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsRepository
  extends Repository<Chat>
  implements IChatsRepository
{
  constructor(
    @InjectRepository(Chat)
    repository: Repository<Chat>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getChats(userId: number) {
    const chats = await this.createQueryBuilder('chats')
      .leftJoinAndSelect('chats.messages', 'messages')
      .leftJoinAndSelect('messages.author', 'author')
      .leftJoinAndSelect('chats.users', 'participants')
      .select([
        'messages',
        'participants.id',
        'participants.username',
        'chats',
        'author.id',
        'author.username',
        'author.isOnline',
      ])
      .orderBy('messages.sentDate', 'ASC')
      .getMany();
    return chats;
  }
}
