import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { UsersService } from './users.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class UsersGateway implements OnGatewayConnection {
    @WebSocketServer()
    private server: Server;

    constructor(private usersService: UsersService) {}

    async handleConnection(client: Socket, ) {
        this.server.to(client.id).emit('users', await this.usersService.findAll());
    }

    @SubscribeMessage('users')
    async getAllUsers() {
        return await this.usersService.findAll();
    }
}