import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { IMessagesRepository } from './messages.repository.interface';

@Injectable()
export class MessagesRepository
  extends Repository<Message>
  implements IMessagesRepository
{
  constructor(
    @InjectRepository(Message)
    repository: Repository<Message>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async addMessage(userId: number, message: string, chatId: number) {
    const newMessage = {
      text: message,
      sentDate: new Date(Date.now()),
      author: () => userId.toString(),
      chat: () => chatId.toString(),
    };
    const msg = await this.createQueryBuilder()
      .insert()
      .into(Message)
      .values(newMessage)
      .returning('id')
      .execute();
    const msg2 = await this.createQueryBuilder('message')
      .leftJoinAndSelect('message.author', 'author')
      .where('message.id = :id', { id: msg.raw[0].id })
      .getOne();

    return msg2;
  }
}
