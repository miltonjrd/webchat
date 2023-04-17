import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn } from 'typeorm';
import { Message } from '../messages/message.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Message, message => message.addressee)
    received_messages: Message[];

    @OneToMany(() => Message, message => message.author)
    sent_messages: Message[];
}