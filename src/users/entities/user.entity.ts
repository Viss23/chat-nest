import { timestamp } from 'rxjs';
import { Chat } from 'src/chats/entities/chat.entity';
import { Message } from 'src/messages/entities/message.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  pass: number;

  @Column({ default: false })
  isOnline: boolean;

  @Column('timestamp', { nullable: true })
  lastUpdate: Date;

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.author)
  sentMessages: Message[];
}
