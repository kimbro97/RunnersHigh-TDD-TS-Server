import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Room } from "./room.entity";
import { User } from "./user.entity";

@Entity()
export class Chatting extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chat: string;

    @ManyToOne(type => User, user => user.id, { eager: true })
    user: User

    @ManyToOne(type => Room, room => room.id, { eager: true })
    room: Room

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}