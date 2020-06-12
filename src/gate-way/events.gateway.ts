import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseFilters } from '@nestjs/common';

import { UserService } from '@/user/user.service';
import { IRequestConnect, IMessage } from './definition/gate-way.interface';
import { WsExceptionsFilter } from '@/common/exceptions/socket-exception.filter';

@UseFilters(new WsExceptionsFilter())
@WebSocketGateway()
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userService: UserService) {}
  private logger = new Logger('EventGateway');
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    this.logger.log('Client connected !');
    socket.emit('new', 'News');
  }
  handleDisconnect() {
    this.logger.log('Client disconnected !');
  }

  @SubscribeMessage('events')
  async requestConnectToChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() request: IRequestConnect,
  ) {
    const { eventId } = request;
    this.server.emit(eventId, `someone joined room with roomId: ${eventId}`);
  }

  @SubscribeMessage('createMessage')
  async createMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: IMessage,
  ) {
    const { message, eventId } = body;
    if (!eventId || !message)
      throw new WsException({ status: 400, message: 'Missing params' });
    this.server.emit(eventId, message);
  }
}
