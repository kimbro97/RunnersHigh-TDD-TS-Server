import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Room } from "./room.entity";
import { User } from "./user.entity";

@Entity()
export class UserRoom extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id, { eager: false })
    user: User

    @ManyToOne(type => Room, room => room.id, { eager: true })
    room: Room

    @ManyToOne(type => User, user => user.id, { eager: true })
    pair: User

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}