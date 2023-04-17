import { Socket } from 'socket.io-client';

import IMessage from 'src/utils/interfaces/message.interface';
import IUser from 'src/utils/interfaces/user.interface';

import CreateUserDto from 'src/utils/dto/create-user.dto';

class ChatSocket {
    constructor(private socket: Socket) {
        this.socket.connect();
    }

    userRegister(data: CreateUserDto, fn: (response: { success: boolean, message: string }) => void) {
        this.socket.emit('userRegister', data, fn);
    }

    getMessages(fn: (messages: IMessage[]) => void) {
        this.socket.emit('messages', {}, fn);
    }

    getUserList(fn: (users: IUser[]) => void) {
        this.socket.emit('users', null,  fn);
    }

    sendMessage(data: { text: string, addresseeId: number }) {
        this.socket.emit('send message', data);
    }

    getMessagesWithUser(addresseeId: number, fn: (messages: IMessage[]) => void) {
        this.socket.emit('get user messages', { addresseeId }, fn);
    }
}

export default ChatSocket;