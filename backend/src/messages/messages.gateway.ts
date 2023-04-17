import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';

import { MessagesService } from './messages.service';
import { SocketAuthGuard } from 'src/guards/socket-auth.guard';

@UseGuards(SocketAuthGuard)
@WebSocketGateway({ cors: true })
export class MessagesGateway {
    constructor(private messagesService: MessagesService) {}

    @SubscribeMessage('messages')
    async findAll() {
        return await this.messagesService.getAll();
    }

    @SubscribeMessage('send message')
    async createMessage(@MessageBody() body: { text: string, addresseeId: number }, @ConnectedSocket() socket: Socket) {
        await this.messagesService.create({ ...body, authorId: socket.data.user_id });
    }

    @SubscribeMessage('get user messages')
    async getMessagesWithUser(@MessageBody() body: { addresseeId: number }, @ConnectedSocket() socket: Socket) {
        const messages = await this.messagesService.getMessagesWithUser({ ...body, authorId: socket.data.user_id});
        return messages;
    }
}