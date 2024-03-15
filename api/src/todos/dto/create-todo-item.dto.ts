import { IsNotEmpty, MaxLength } from 'class-validator';
import { TODO_MAX_LENGTH } from '../entities/todo-item.entity';

export class CreateTodoItemDto {
  @IsNotEmpty()
  @MaxLength(TODO_MAX_LENGTH)
  content: string;
}
