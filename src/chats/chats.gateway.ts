import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private chatsService: ChatsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('request_all_chats')
  async findAllChatsOfUser(
    @MessageBody('userId') id: number,
    @ConnectedSocket() socket: Socket,
  ) {
    const chats = await this.chatsService.getChats(id);
    console.log(chats);
    chats.forEach(({ id }) => {
      socket.join(`${id}Chat`);
    });
    this.server.emit('send_all_chats', chats);
  }

  @SubscribeMessage('send_message')
  async sendMessage(
    @MessageBody('chatId') chatId: number,
    @MessageBody('message') message: string,
    @MessageBody('userId') userId: number,
  ) {
    const newMessage = await this.chatsService.addMessage(
      userId,
      message,
      chatId,
    );
    await this.chatsService.changeOnlineStatus(userId, true);
    this.server.to(`${chatId}Chat`).emit('receive_message', newMessage);
    this.server
      .to(`${chatId}Chat`)
      .emit('status_change', { userId, status: true });
    setTimeout(() => {
      this.chatsService.changeOnlineStatusWithDelay(
        userId,
        false,
        this.server,
        chatId,
      );
    }, 10000);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('chatId') chatId: number,
    @MessageBody('userId') userId: number,
  ) {
    console.log(chatId, userId);
    await this.chatsService.changeOnlineStatus(userId, true);
    this.server
      .to(`${chatId}Chat`)
      .emit('status_change', { userId, status: true });
    setTimeout(() => {
      this.chatsService.changeOnlineStatusWithDelay(
        userId,
        false,
        this.server,
        chatId,
      );
    }, 10000);
  }
}
