import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { UsersService } from './users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UserGateway {
  constructor(private userService: UsersService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('request_all_users')
  async getAllUsers(@MessageBody('userId') id: number) {
    const users = await this.userService.getAllUsers();
    this.server.emit('send_all_users', users);
  }
}
