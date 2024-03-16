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
import { Order, PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

describe('TodosService', () => {
  const userId = 'userId';
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
      const insertMock = (
        todosRepository.insert as jest.Mock
      ).mockResolvedValue({
        identifiers: [{ id }],
        generatedMaps: [{ id, createdAt }],
        raw: [{ id, created_at: createdAt }],
      } satisfies InsertResult);

      const result = await todosService.create(createTodoItemDto, userId);

      expect(result).toEqual({
        id,
        content: createTodoItemDto.content,
        createdAt,
      } satisfies TodoItemDto);
      expect(insertMock).toHaveBeenCalled();
      const insertArgument: TodoItem = insertMock.mock.calls[0][0];
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

    it('should delete an existing todo item', async () => {
      const deleteMock = (
        todosRepository.delete as jest.Mock
      ).mockResolvedValue({ raw: [], affected: 1 } satisfies DeleteResult);

      await todosService.delete(todoId, userId);

      expect(deleteMock).toHaveBeenCalledWith({ id: todoId, userId });
    });

    it('should not delete anything when todo item not found', async () => {
      const deleteMock = (
        todosRepository.delete as jest.Mock
      ).mockResolvedValue({ raw: [], affected: 0 } satisfies DeleteResult);

      await expect(() => todosService.delete(todoId, userId)).rejects.toThrow(
        new NotFoundException('Todo item not found'),
      );

      expect(deleteMock).toHaveBeenCalledWith({ id: todoId, userId });
    });

    it('should forward an error from the repository', async () => {
      const error = new Error('db error');
      (todosRepository.delete as jest.Mock).mockRejectedValue(error);

      await expect(() => todosService.delete(todoId, userId)).rejects.toThrow(
        error,
      );
    });
  });

  describe('getTodosPage()', () => {
    const pageOptionsDto: PageOptionsDto = {
      order: Order.ASC,
      pageNumber: 2,
      pageSize: 2,
      skip: 2,
    };

    it('should return a page of todo items', async () => {
      const foundTodos: TodoItemDto[] = [
        { id: 'todoId1', content: 'todo 1', createdAt: new Date() },
        { id: 'todoId2', content: 'todo 2', createdAt: new Date() },
      ];
      const todosCount = 5;
      const findAndCountMock = (
        todosRepository.findAndCount as jest.Mock
      ).mockResolvedValue([foundTodos, todosCount]);

      const result = await todosService.getTodosPage(pageOptionsDto, userId);

      expect(result).toEqual({
        data: foundTodos,
        metadata: {
          pageNumber: pageOptionsDto.pageNumber,
          pageSize: pageOptionsDto.pageSize,
          itemCount: todosCount,
          pageCount: Math.ceil(todosCount / pageOptionsDto.pageSize),
          hasPreviousPage: true,
          hasNextPage: true,
        },
      } satisfies PageDto<TodoItemDto>);
      expect(findAndCountMock).toHaveBeenCalledWith({
        where: { userId },
        order: { createdAt: pageOptionsDto.order },
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.pageSize,
      } satisfies FindManyOptions<TodoItem>);
    });

    it('should forward an error from the repository', async () => {
      const error = new Error('test error');
      (todosRepository.findAndCount as jest.Mock).mockRejectedValue(error);

      await expect(() =>
        todosService.getTodosPage(pageOptionsDto, userId),
      ).rejects.toThrow(error);
    });
  });
});
