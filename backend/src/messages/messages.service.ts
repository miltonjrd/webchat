import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { repositories } from 'src/constants';
import { Message } from './message.entity';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
    constructor(
        @Inject(repositories.MESSAGE_REPOSITORY) 
        private messageRepository: Repository<Message>,
        private usersService: UsersService
    ) {}

    async getAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    async create(body: { text: string, addresseeId: number, authorId: number }): Promise<boolean> {
        const addressee = await this.usersService.findById(body.addresseeId);
        const author = await this.usersService.findById(body.authorId);

        const message = new Message();
        message.text = body.text;
        message.addressee = addressee;
        message.author = author;

        await this.messageRepository.save(message);

        return true;
    }

    async getMessagesWithUser(body: { addresseeId: number, authorId: number }): Promise<Message[]> {
        const sentMessages = await this.messageRepository.find({
            select: {
                text: true,
                id: true,
                created_at: true,
            },
            where: {
                author: {
                    id: body.authorId
                },
                addressee: {
                    id: body.addresseeId
                }
            }
        });

        const receivedMessages = (await this.messageRepository.find({
            select: {
                text: true,
                id: true,
                created_at: true,
            },
            where: {
                author: {
                    id: body.addresseeId
                },
                addressee: {
                    id: body.authorId
                }
            }
        })).map((msg) => ({
            ...msg,
            received: true
        }));
        
        return [...sentMessages, ...receivedMessages].sort((a, b) => {
            return Number(new Date(a.created_at)) - Number(new Date(b.created_at));
        });
    }
}