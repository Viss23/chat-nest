import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesRepository } from 'src/messages/messages.repository';
import { IMessagesRepository } from 'src/messages/messages.repository.interface';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';
import { ChatsRepository } from './chats.repository';
import { IChatsRepository } from './chats.repository.interface';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatsRepository)
    private chatsRepository: IChatsRepository,
    private messagesService: MessagesService,
    private usersService: UsersService,
  ) {}

  async getChats(userId: number) {
    return await this.chatsRepository.getChats(userId);
  }

  async addMessage(userId: number, message: string, chatId: number) {
    return await this.messagesService.addMessage(userId, message, chatId);
  }

  async changeOnlineStatus(id, status) {
    return await this.usersService.changeOnlineStatus(id, status);
  }

  async changeOnlineStatusWithDelay(userId, status, server, chatId) {
    const isUpdated = await this.usersService.changeOnlineStatusDelay(
      userId,
      status,
    );
    if (isUpdated) {
      server.to(`${chatId}Chat`).emit('status_change', { userId, status });
    }
  }
}
