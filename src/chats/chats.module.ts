import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from 'src/messages/messages.module';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chats.gateway';
import { ChatsRepository } from './chats.repository';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), MessagesModule, UsersModule],
  providers: [ChatsService, ChatGateway, ChatsRepository],
})
export class ChatsModule {}
