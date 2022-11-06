import { Chat } from 'src/chats/entities/chat.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column('timestamp')
  sentDate: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  author: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
