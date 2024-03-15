import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export const TODO_MAX_LENGTH = 2_000;

@Entity({ name: 'todo_items' })
export class TodoItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: TODO_MAX_LENGTH })
  content: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @ManyToOne(() => User, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @Column({ name: 'user_id' })
  public userId: string;
}
