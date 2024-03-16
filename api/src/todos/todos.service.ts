import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo-item.entity';
import { TodoItemDto } from './dto/todo-item.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { PageMetadataDto } from './dto/page-metadata.dto';

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
      createdAt: generatedMap.createdAt,
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

  async getTodosPage(
    pageOptionsDto: PageOptionsDto,
    userId: string,
  ): Promise<PageDto<TodoItemDto>> {
    const [foundTodos, todosCount] = await this.todosRepository.findAndCount({
      where: { userId },
      order: { createdAt: pageOptionsDto.order },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.pageSize,
    });

    const pageMetadata = new PageMetadataDto(pageOptionsDto, todosCount);
    return new PageDto<TodoItemDto>(foundTodos, pageMetadata);
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
