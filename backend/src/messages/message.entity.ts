import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    text: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user => user.received_messages)
    @JoinColumn({ name: 'addressee_id' })
    addressee: User;

    @ManyToOne(() => User, user => user.sent_messages)
    @JoinColumn({ name: 'author_id' })
    author: User;
}