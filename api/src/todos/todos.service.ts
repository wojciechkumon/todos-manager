import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo-item.entity';
import { TodoItemDto } from './dto/todo-item.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todosRepository: Repository<TodoItem>,
  ) {}

  async create(
    createTodoDto: CreateTodoItemDto,
    userId: string,
  ): Promise<TodoItemDto> {
    const newTodo = this.createNewTodoItem(createTodoDto, userId);

    const { generatedMaps } = await this.todosRepository.insert(newTodo);
    const generatedMap = generatedMaps[0] as Pick<TodoItem, 'id' | 'createdAt'>;
    return {
      id: generatedMap.id,
      content: newTodo.content,
      created_at: generatedMap.createdAt,
    };
  }

  private createNewTodoItem(
    createTodoDto: CreateTodoItemDto,
    userId: string,
  ): TodoItem {
    const newTodo: TodoItem = new TodoItem();
    newTodo.content = createTodoDto.content;
    newTodo.userId = userId;
    return newTodo;
  }

  async delete(todoId: string, userId: string): Promise<void> {
    const { affected } = await this.todosRepository.delete({
      id: todoId,
      userId,
    });
    if (!affected) {
      throw new NotFoundException('Todo item not found');
    }
  }
}
