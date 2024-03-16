import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { TodoItemDto } from './dto/todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

describe('TodosService', () => {
  let todosService: TodosService;
  let todosRepository: Repository<TodoItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(TodoItem),
          useValue: createMock<Repository<TodoItem>>(),
        },
      ],
    }).compile();

    todosService = module.get<TodosService>(TodosService);
    todosRepository = module.get<Repository<TodoItem>>(
      getRepositoryToken(TodoItem),
    );
  });

  describe('create()', () => {
    const createTodoItemDto: CreateTodoItemDto = {
      content: 'new todo item',
    };
    const userId = 'abb87c24-7b62-4408-99ab-f08196b3ab25';

    it('should insert a new todo item', async () => {
      const id = 'f0062fe7-fef3-4945-bf42-f336a1ab6714';
      const createdAt = new Date();
      const insertSpy = (todosRepository.insert as jest.Mock).mockResolvedValue(
        {
          identifiers: [{ id }],
          generatedMaps: [{ id, createdAt }],
          raw: [{ id, created_at: createdAt }],
        } satisfies InsertResult,
      );

      const result = await todosService.create(createTodoItemDto, userId);

      expect(result).toEqual({
        id,
        content: createTodoItemDto.content,
        created_at: createdAt,
      } satisfies TodoItemDto);
      expect(insertSpy).toHaveBeenCalled();
      const insertArgument: TodoItem = insertSpy.mock.calls[0][0];
      expect(insertArgument.userId).toEqual(userId);
      expect(insertArgument.content).toEqual(createTodoItemDto.content);
    });

    it('should forward an error from the repository', async () => {
      const error = new InternalServerErrorException();
      (todosRepository.insert as jest.Mock).mockRejectedValue(error);

      await expect(() =>
        todosService.create(createTodoItemDto, userId),
      ).rejects.toThrow(error);
    });
  });

  describe('delete()', () => {
    const todoId = 'todoId';
    const userId = 'userId';

    it('should delete an existing todo item', async () => {
      const deleteSpy = (todosRepository.delete as jest.Mock).mockResolvedValue(
        { raw: [], affected: 1 } satisfies DeleteResult,
      );

      await todosService.delete(todoId, userId);

      expect(deleteSpy).toHaveBeenCalledWith({ id: todoId, userId });
    });

    it('should not delete anything when todo item not found', async () => {
      const deleteSpy = (todosRepository.delete as jest.Mock).mockResolvedValue(
        { raw: [], affected: 0 } satisfies DeleteResult,
      );

      await expect(() => todosService.delete(todoId, userId)).rejects.toThrow(
        new NotFoundException('Todo item not found'),
      );

      expect(deleteSpy).toHaveBeenCalledWith({ id: todoId, userId });
    });

    it('should forward an error from the repository', async () => {
      const error = new Error('db error');
      (todosRepository.delete as jest.Mock).mockRejectedValue(error);

      await expect(() => todosService.delete(todoId, userId)).rejects.toThrow(
        error,
      );
    });
  });
});
