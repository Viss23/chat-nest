import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesRepository } from './messages.repository';
import { IMessagesRepository } from './messages.repository.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesRepository)
    private messagesRepository: IMessagesRepository,
  ) {}

  addMessage(userId: number, message: string, chatId: number) {
    return this.messagesRepository.addMessage(userId, message, chatId);
  }
}
